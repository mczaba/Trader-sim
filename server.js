const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api", (req, res, next) => {
  console.log(req.body);
  fs.writeFile(
    path.join(__dirname, "data", "save.json"),
    JSON.stringify(req.body),
    error => {
      if (error) {
        throw error;
      }
      console.log("saved");
    }
  );
  next();
});

app.get("/api", (req, res) => {
  fs.readFile(path.join(__dirname, "data", "save.json"), (err, response) => {
    const data = JSON.parse(response);
    console.log(data);
    res.json(data);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT);
