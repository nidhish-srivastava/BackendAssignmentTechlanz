import express from "express"
import { deleteFile, downloadFile, uploadFile } from "./controllers.js"
import {upload} from "./utils/multerConfig.js"
const router = express.Router()

router.post("/upload", upload.single("file"),uploadFile)
router.get("/download/:id",downloadFile)
router.delete("/delete/:id",deleteFile)

export default router