

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  const publicUrl = `${req.protocol}://${req.get("host")}/uploads/${file.originalname}`;

  res.status(200).json({
    message: "Image uploaded successfully",
    url: publicUrl,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use("/public", express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `/public/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// ✅ Add this below
app.get("/upload", (req, res) => {
  res.send("✅ Upload route is live. Use POST request to upload an image.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
