import { Metadata } from "./model.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File upload controller
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded or invalid file type." });
        }

        // Extract file metadata
        const { originalname, mimetype, size, filename } = req.file;

        // Save metadata to the database
        const metadata = new Metadata({
            filename,
            size,
            mimeType: mimetype,
        });

        await metadata.save();

        return res.status(201).json({
            message: "File uploaded successfully",
            file: { originalname, mimetype, size, filename },
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const downloadFile = async (req, res) => {
    try {
        const { id } = req.params; // Unique ID of the file (MongoDB document ID)

        // Find file metadata in the database
        const fileMetadata = await Metadata.findById(id);

        if (!fileMetadata) {
            return res.status(404).json({ error: "File not found" });
        }

        const filePath = path.join(__dirname, "uploads", fileMetadata.filename);

        // Check if file exists in the uploads directory
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found on server" });
        }

        // Set appropriate headers for file download
        res.setHeader("Content-Disposition", `attachment; filename="${fileMetadata.filename}"`);
        res.setHeader("Content-Type", fileMetadata.mimeType);

        // Stream the file to the client
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error("Error downloading file:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const deleteFile = async (req, res) => {
    try {
        const { id } = req.params
        const fileMetadata = await Metadata.findById({ _id: id })
        if (!fileMetadata) {
            return res.status(404).json({ error: "File not found" });
        }
        const filePath = path.join(__dirname, "uploads", fileMetadata.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        else {
            console.warn(`File ${filePath} not found on server. Deleting metadata only`)
        }
        await Metadata.findByIdAndDelete(id);

        return res.status(200).json({ message: "File and metadata deleted successfully" });
    } catch (error) {
        console.error("Error deleting file:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export { uploadFile, downloadFile, deleteFile }