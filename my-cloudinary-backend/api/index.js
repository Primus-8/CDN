// index.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/upload", (req, res) => {
  res.send("Upload route working. But use POST to upload files.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
