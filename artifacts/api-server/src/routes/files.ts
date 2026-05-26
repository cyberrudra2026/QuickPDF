import { Router } from "express";
import { getAuth } from "@clerk/express";
import { db, filesTable } from "@workspace/db";
import { eq, desc, count, sum, sql } from "drizzle-orm";
import { ListFilesQueryParams, DeleteFileParams } from "@workspace/api-zod";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.userId = userId;
  next();
}

router.get("/files/stats", requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId as string;

    const [totalResult] = await db
      .select({ count: count() })
      .from(filesTable)
      .where(eq(filesTable.userId, userId));

    const [sizeResult] = await db
      .select({ total: sum(filesTable.fileSizeBytes) })
      .from(filesTable)
      .where(eq(filesTable.userId, userId));

    const byOpRows = await db
      .select({
        operation: filesTable.operation,
        count: count(),
      })
      .from(filesTable)
      .where(eq(filesTable.userId, userId))
      .groupBy(filesTable.operation);

    const byOperation: Record<string, number> = {};
    for (const row of byOpRows) {
      byOperation[row.operation] = Number(row.count);
    }

    const recentFiles = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.userId, userId))
      .orderBy(desc(filesTable.createdAt))
      .limit(5);

    return res.json({
      totalFiles: Number(totalResult.count),
      byOperation,
      totalSizeBytes: Number(sizeResult.total ?? 0),
      recentFiles,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get file stats");
    return res.status(500).json({ error: "Failed to get file stats" });
  }
});

router.get("/files", requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId as string;
    const parsed = ListFilesQueryParams.safeParse(req.query);
    const limit = parsed.success ? (parsed.data.limit ?? 20) : 20;
    const offset = parsed.success ? (parsed.data.offset ?? 0) : 0;

    const [totalResult] = await db
      .select({ count: count() })
      .from(filesTable)
      .where(eq(filesTable.userId, userId));

    const files = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.userId, userId))
      .orderBy(desc(filesTable.createdAt))
      .limit(limit)
      .offset(offset);

    return res.json({
      files,
      total: Number(totalResult.count),
      limit,
      offset,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list files");
    return res.status(500).json({ error: "Failed to list files" });
  }
});

router.delete("/files/:fileId", requireAuth, async (req: any, res) => {
  try {
    const userId = req.userId as string;
    const parsed = DeleteFileParams.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid file ID" });
    }
    const { fileId } = parsed.data;

    const [existing] = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.id, fileId));

    if (!existing || existing.userId !== userId) {
      return res.status(404).json({ error: "File not found" });
    }

    await db.delete(filesTable).where(eq(filesTable.id, fileId));

    return res.json({ success: true, message: "File deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete file");
    return res.status(500).json({ error: "Failed to delete file" });
  }
});

export default router;
