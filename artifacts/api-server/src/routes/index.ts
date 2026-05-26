import { Router, type IRouter } from "express";
import healthRouter from "./health";
import filesRouter from "./files";
import pdfRouter from "./pdf";

const router: IRouter = Router();

router.use(healthRouter);
router.use(filesRouter);
router.use(pdfRouter);

export default router;
