//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");


// Handling Asynchronous Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// Setting up server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Static middleware
app.use(express.static("./public"));


// API Route | "GET" request
app.get("/api/notes", function(req, res) {
    readFileAsync("./db/db.json", "utf-8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);[]
    })
});


// API Route | "POST" request
app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./db/db.json", "utf-8").then(function(data) {
        const note = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});


// API Route | "DELETE" request
app.delete("/api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./db/db.json", "utf-8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i = 0; i<notes.length; i++) {
            if(idToDelete !== notes[!].id) {
                newNotesData.push(notes[i])
            }
        }
    }).then(function (notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.send('success!');
    }) 
})


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

