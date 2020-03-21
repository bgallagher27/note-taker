// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const dataBase = require("./db/db.json");
//const fs = require("fs");



// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.static("/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to get to the note taker
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Route to show the stored notes
app.get("/api/notes", function(req, res) {
  return res.json(dataBase);
});

// API route for creating a new note
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  console.log(newNote);
  dataBase.push(newNote);
  res.json(newNote);
});

// Route to delete a note
app.delete("/api/notes/:id", function(req, res) {
  let id = req.params.id;
  console.log("note: '" + id + "' has been deleted");
  dataBase.splice(req, 1);
  res.send("success");
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  