const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../../../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = async (req, res) => {
  if (req.method === "POST") {
    upload.single("image")(req, res, function (err) {
      if (err) {
        return res.status(500).json({ error: "Upload failed." });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      return res.status(200).json({ url: imageUrl });
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
