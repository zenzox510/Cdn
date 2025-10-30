const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// Setup storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Set EJS for frontend
app.set("view engine", "ejs");
app.use(express.static("public"));

// Homepage – upload form
app.get("/", (req, res) => {
  const files = fs.readdirSync(uploadPath).map((file) => ({
    name: file,
    url: `/uploads/${file}`,
  }));
  res.render("index", { files });
});

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.redirect("/");
});

// Serve uploaded files with proper MIME types
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(uploadPath, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");
  res.sendFile(filePath);
});

app.listen(PORT, () => console.log(`🚀 Zaynix running on port ${PORT}`));
