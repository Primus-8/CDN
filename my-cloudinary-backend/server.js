const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Make uploads publicly accessible
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    const publicPath = path.join(__dirname, "public/uploads");

    // Ensure both folders exist
    [uploadPath, publicPath].forEach((folder) => {
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    });

    // Save in both: internal and public
    fs.copyFileSync(file.path, path.join(publicPath, file.originalname));
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // You can customize file name here
  },
});

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
  
