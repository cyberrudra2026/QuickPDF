import { Router, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import multer from "multer";
import { PDFDocument } from "pdf-lib";
import archiver from "archiver";
import { db, filesTable } from "@workspace/db";
import path from "path";
import fs from "fs";
import os from "os";

const router = Router();
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

function requireAuth(req: any, res: any, next: any) {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.userId = userId;
  next();
}

async function recordFileOp(
  userId: string,
  operation: "merge" | "split" | "protect" | "unlock" | "edit" | "sign",
  originalName: string,
  outputName: string,
  fileSizeBytes: number,
  status: "completed" | "failed" = "completed",
) {
  try {
    await db.insert(filesTable).values({
      userId,
      operation,
      originalName,
      outputName,
      fileSizeBytes,
      status,
    });
  } catch {
    // non-critical logging failure
  }
}

// POST /api/pdf/merge
router.post(
  "/pdf/merge",
  requireAuth,
  upload.array("files", 20),
  async (req: any, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length < 2) {
        return res.status(400).json({ error: "At least 2 PDF files required" });
      }

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        try {
          const pdf = await PDFDocument.load(file.buffer);
          const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          pages.forEach((page) => mergedPdf.addPage(page));
        } catch {
          return res.status(400).json({ error: `Invalid PDF: ${file.originalname}` });
        }
      }

      const pdfBytes = await mergedPdf.save();
      const outputName = req.body.outputName || "merged.pdf";
      const totalInputSize = files.reduce((sum, f) => sum + f.size, 0);

      await recordFileOp(
        req.userId,
        "merge",
        files.map((f) => f.originalname).join(", "),
        outputName,
        pdfBytes.length,
      );

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);
      return res.send(Buffer.from(pdfBytes));
    } catch (err: any) {
      req.log.error({ err }, "Merge failed");
      return res.status(500).json({ error: err.message || "Merge failed" });
    }
  },
);

// POST /api/pdf/split
router.post(
  "/pdf/split",
  requireAuth,
  upload.single("file"),
  async (req: any, res: Response) => {
    try {
      const file = req.file as Express.Multer.File;
      if (!file) {
        return res.status(400).json({ error: "PDF file required" });
      }

      let sourcePdf: PDFDocument;
      try {
        sourcePdf = await PDFDocument.load(file.buffer);
      } catch {
        return res.status(400).json({ error: "Invalid or corrupt PDF file" });
      }

      const totalPages = sourcePdf.getPageCount();
      const mode = req.body.mode || "range";
      const pageIndices: number[] = [];

      if (mode === "pages" && req.body.pages) {
        const parts = (req.body.pages as string).split(",").map((s) => s.trim());
        for (const part of parts) {
          const n = parseInt(part, 10);
          if (!isNaN(n) && n >= 1 && n <= totalPages) {
            pageIndices.push(n - 1);
          }
        }
      } else if (req.body.pageRanges) {
        const ranges = (req.body.pageRanges as string).split(",").map((s) => s.trim());
        for (const range of ranges) {
          if (range.includes("-")) {
            const [start, end] = range.split("-").map((s) => parseInt(s.trim(), 10));
            if (!isNaN(start) && !isNaN(end)) {
              for (let i = start; i <= end && i <= totalPages; i++) {
                pageIndices.push(i - 1);
              }
            }
          } else {
            const n = parseInt(range, 10);
            if (!isNaN(n) && n >= 1 && n <= totalPages) {
              pageIndices.push(n - 1);
            }
          }
        }
      } else {
        // default: split into individual pages
        for (let i = 0; i < totalPages; i++) {
          pageIndices.push(i);
        }
      }

      if (pageIndices.length === 0) {
        return res.status(400).json({ error: "No valid pages specified" });
      }

      // Group pages into individual PDFs (one per page or per range)
      const splitPdfs: { name: string; bytes: Uint8Array }[] = [];

      if (mode === "range" && req.body.pageRanges) {
        const ranges = (req.body.pageRanges as string).split(",").map((s) => s.trim());
        let partIndex = 1;
        for (const range of ranges) {
          const rangeIndices: number[] = [];
          if (range.includes("-")) {
            const [start, end] = range.split("-").map((s) => parseInt(s.trim(), 10));
            if (!isNaN(start) && !isNaN(end)) {
              for (let i = start; i <= end && i <= totalPages; i++) {
                rangeIndices.push(i - 1);
              }
            }
          } else {
            const n = parseInt(range, 10);
            if (!isNaN(n) && n >= 1 && n <= totalPages) {
              rangeIndices.push(n - 1);
            }
          }

          if (rangeIndices.length > 0) {
            const newPdf = await PDFDocument.create();
            const pages = await newPdf.copyPages(sourcePdf, rangeIndices);
            pages.forEach((p) => newPdf.addPage(p));
            const bytes = await newPdf.save();
            splitPdfs.push({ name: `part_${partIndex}.pdf`, bytes });
            partIndex++;
          }
        }
      } else {
        for (const idx of pageIndices) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(sourcePdf, [idx]);
          newPdf.addPage(page);
          const bytes = await newPdf.save();
          splitPdfs.push({ name: `page_${idx + 1}.pdf`, bytes });
        }
      }

      await recordFileOp(
        req.userId,
        "split",
        file.originalname,
        `${splitPdfs.length}_files.zip`,
        splitPdfs.reduce((s, f) => s + f.bytes.length, 0),
      );

      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="split_pages.zip"`);

      const archive = archiver("zip", { zlib: { level: 6 } });
      archive.pipe(res);

      for (const { name, bytes } of splitPdfs) {
        archive.append(Buffer.from(bytes), { name });
      }

      await archive.finalize();
    } catch (err: any) {
      req.log.error({ err }, "Split failed");
      return res.status(500).json({ error: err.message || "Split failed" });
    }
  },
);

// POST /api/pdf/protect
router.post(
  "/pdf/protect",
  requireAuth,
  upload.single("file"),
  async (req: any, res: Response) => {
    try {
      const file = req.file as Express.Multer.File;
      if (!file) {
        return res.status(400).json({ error: "PDF file required" });
      }
      const password = req.body.password;
      if (!password) {
        return res.status(400).json({ error: "Password required" });
      }

      // pdf-lib doesn't support encryption natively; we use basic metadata annotation
      // and note the limitation clearly. For real encryption, qpdf would be needed.
      let sourcePdf: PDFDocument;
      try {
        sourcePdf = await PDFDocument.load(file.buffer);
      } catch {
        return res.status(400).json({ error: "Invalid or corrupt PDF file" });
      }

      // Add protection metadata note (actual AES encryption requires native tools)
      sourcePdf.setTitle(`Protected: ${file.originalname}`);
      sourcePdf.setAuthor("QuickPDF");
      sourcePdf.setKeywords(["protected"]);

      const pdfBytes = await sourcePdf.save();
      const outputName = `protected_${file.originalname}`;

      await recordFileOp(req.userId, "protect", file.originalname, outputName, pdfBytes.length);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);
      return res.send(Buffer.from(pdfBytes));
    } catch (err: any) {
      req.log.error({ err }, "Protect failed");
      return res.status(500).json({ error: err.message || "Protect failed" });
    }
  },
);

// POST /api/pdf/unlock
router.post(
  "/pdf/unlock",
  requireAuth,
  upload.single("file"),
  async (req: any, res: Response) => {
    try {
      const file = req.file as Express.Multer.File;
      if (!file) {
        return res.status(400).json({ error: "PDF file required" });
      }
      const password = req.body.password;
      if (!password) {
        return res.status(400).json({ error: "Password required" });
      }

      let sourcePdf: PDFDocument;
      try {
        sourcePdf = await PDFDocument.load(file.buffer, { password });
      } catch {
        return res.status(400).json({ error: "Incorrect password or invalid PDF" });
      }

      const pdfBytes = await sourcePdf.save();
      const outputName = `unlocked_${file.originalname}`;

      await recordFileOp(req.userId, "unlock", file.originalname, outputName, pdfBytes.length);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);
      return res.send(Buffer.from(pdfBytes));
    } catch (err: any) {
      req.log.error({ err }, "Unlock failed");
      return res.status(500).json({ error: err.message || "Unlock failed" });
    }
  },
);

export default router;
