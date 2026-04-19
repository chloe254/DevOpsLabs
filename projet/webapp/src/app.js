const express = require("express");
const path = require("path");

const app = express();

// Serve static files (CV image)
app.use("/static", express.static(path.join(__dirname, "../public")));

// Home page display CV image
app.get("/", (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>CV – Clara Chalayer </title>
        <style>
          body {
            margin: 0;
            background: #f4f4f4;
            display: flex;
            justify-content: center;
          }
          img {
            max-width: 900px;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <img src="/static/CV.jpg" alt="CV Clara Chalayer" />
      </body>
    </html>
  `);
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;