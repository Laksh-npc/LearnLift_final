const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://yugenjarwal23cse:wNu13Q4j1Bf5SFqL@learnliftcluster.pjesp.mongodb.net/quiz',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Define schema and model
const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number,
});

const Question = mongoose.model('Question', QuestionSchema);

// Questions to be added
const questions = [
  {
    question: "What is the correct syntax for the main method in Java?",
    options: [
      "public static void main(String[] args)",
      "static public void main(String[] args)",
      "public static main(String[] args)",
      "None of the above",
    ],
    answer: 0,
  },
  {
    question: "Which of these is a reserved keyword in Java?",
    options: ["object", "main", "strictfp", "null"],
    answer: 2,
  },
  {
    question: "Which of these cannot be used for a variable name in Java?",
    options: ["_identifier", "$variable", "1variable", "varName"],
    answer: 2,
  },
  {
    question: "Which class is the superclass for all classes in Java?",
    options: ["Object", "Class", "Interface", "None"],
    answer: 0,
  },
  {
    question: "What is the default value of a boolean in Java?",
    options: ["true", "false", "null", "undefined"],
    answer: 1,
  },
  {
    question: "Java is a ___ language?",
    options: ["High-Level", "Low-Level", "Assembly-Level", "Middle-Level"],
    answer: 0,
  },
  {
    question: "What is the size of an int in Java?",
    options: ["4 bytes", "2 bytes", "8 bytes", "None of these"],
    answer: 0,
  },
  {
    question: "What does JVM stand for?",
    options: [
      "Java Virtual Machine",
      "Java Verified Machine",
      "Java Visual Method",
      "None of the above",
    ],
    answer: 0,
  },
  {
    question: "Which of these is not a primitive type in Java?",
    options: ["int", "float", "String", "char"],
    answer: 2,
  },
  {
    question: "What is used to compile Java code?",
    options: ["JVM", "JDK", "JRE", "JIT"],
    answer: 1,
  },
];

// Insert questions into the database
Question.insertMany(questions)
  .then(() => {
    console.log("Questions added successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error adding questions:", error);
  });
