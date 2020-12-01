const express = require('express');
const fs = require('fs');

var notesData = require("../db/db.json");

const router = express.Router();

router.get("/notes", function (req, res) {
    res.json(notesData);
});

router.post("/notes", function (req, res) {
    const data = req.body;
    data.id = uuidv4(data.id);
    notesData.push(data);
    fs.writeFile('db/db.json', JSON.stringify(notesData), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.json(true)
});

router.delete("/notes/:id", function (req, res) {
    const targetedID = req.params.id;
    notesData = notesData.filter((note, index) => {
        return targetedID !== note.id;
    })
    fs.writeFile('db/db.json', JSON.stringify(notesData), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.json(true);
});

module.exports = router;