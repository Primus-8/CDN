const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Create uploads folder if it doesn't exist
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use("/public", express.static(path.join(__dirname, "../public")));

app.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `/public/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

app.get("/upload", (req, res) => {
  res.send("✅ Upload route is live!");
});

// Export as Vercel handler
module.exports = app;
