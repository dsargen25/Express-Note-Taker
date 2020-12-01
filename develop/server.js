const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

let rawData = fs.readFileSync(path.resolve(__dirname + "/db/db.json"));
let noteData = JSON.parse(rawData);

//API_ROUTES

app.get("/api/notes", function(req, res) {
  res.json(noteData);
});

app.post("/api/notes", function(req, res){
  const jsonData = req.body;
  noteData.push(jsonData);
  for (let i = 1; i < noteData.length; i++) {noteData[i].id = i;};
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(noteData));
  res.json(jsonData);
});

app.delete("/api/notes/:id", function(req, res){
  const removeNote = req.params.id;
  noteData.splice(removeNote, 1);
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(noteData));
  res.json(noteData);
});

//HTML_ROUTES
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//PORT_LISTENING
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});