require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let students = [];
let currentId = 1;

app.get('/api/students', (req, res) => {
  res.json({ data: students });
});

app.post('/api/students', (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ message: "All fields required" });
  }

  const student = {
    id: currentId++,
    name,
    email,
    course
  };

  students.push(student);
  res.json(student);
});

app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);

  students = students.filter(s => s.id !== id);
  res.json({ message: "Deleted successfully" });
});

app.delete('/api/clear', (req, res) => {
  students = [];
  currentId = 1;
  res.json({ message: "Cleared" });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});