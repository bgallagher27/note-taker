// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const dataBase = require("../db/db.json");



// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.static("../public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
  
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
  
app.get("/api/notes", function(req, res) {
  return res.json(dataBase);
});

app.post("/api/notes", function(req, res) {
  let newNote = req.body;

  console.log(newNote);

  dataBase.push(newNote);

  res.json(newNote);
});

app.delete("/api/notes/:id", function(req, res) {
  let id = req.params.id;

  delete dataBase[id];
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  