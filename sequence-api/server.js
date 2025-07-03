const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5050;

app.use(cors());
app.use(bodyParser.json());

let sequences = [];
let currentId = 1;

// GET endpoint - Retrieve all sequences
app.get("/sequences", (req, res) => {
  res.json(sequences);
});

// POST endpoint - Create new sequence
app.post("/sequences", (req, res) => {
  const newSequence = {
    id: currentId++,
    name: req.body.name || `Sequence ${sequences.length + 1}`,
    steps: req.body.steps || [],
    createdAt: new Date().toISOString()
  };

  sequences.push(newSequence);
  res.status(201).json(newSequence);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
