const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// MongoDB Connection
mongoose.connect(
  'mongodb+srv://yugenjarwal23cse:wNu13Q4j1Bf5SFqL@learnliftcluster.pjesp.mongodb.net/quiz',

);



// Define Question Schema
const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number,
});
const Question = mongoose.model('Question', QuestionSchema);

// Setup Express
const app = express();
app.use(express.json());
app.use(cors());




app.use(express.static('C:/Web/frontend/'));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Web/frontend', 'test.HTML'));
});
// Endpoint to Fetch Questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

// Define Result Schema
const ResultSchema = new mongoose.Schema({
  username: String,
  score: Number,
  totalQuestions: Number,
  timestamp: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', ResultSchema);

// Endpoint to Save Results
app.post('/api/saveResult', async (req, res) => {
  const { username, score, totalQuestions } = req.body;
  try {
    const result = new Result({ username, score, totalQuestions });
    await result.save();
    res.json({ message: 'Result saved successfully!' });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Error saving result' });
  }
});

// Endpoint to Fetch Results
app.get('/api/getResults', async (req, res) => {
  try {
    const results = await Result.find().sort({ timestamp: -1 });
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Error fetching results' });
  }
});


// Start Server
const PORT = 5000;
app.listen(5000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
