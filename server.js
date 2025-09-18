// server.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Metadata file
const dataFile = "plantData.json";

// Ensure plantData.json exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  const { date } = req.body;
  const newEntry = {
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    date: date || new Date().toISOString().split("T")[0],
  };

  const data = JSON.parse(fs.readFileSync(dataFile));
  data.push(newEntry);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.json({ message: "Upload successful", entry: newEntry });
});

// Fetch all photos
app.get("/photos", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile));
  res.json(data);
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
