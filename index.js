require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let students = [];
let currentId = 1;

app.get('/api/students', (req, res) => {
  res.json({ data: students });
});

app.post('/api/students', (req, res) => {
  const { name, email, course } = req.body;

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});