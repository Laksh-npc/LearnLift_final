const mongoose = require("mongoose");

const con_string =
  "mongodb+srv://yugenjarwal23cse:wNu13Q4j1Bf5SFqL@learnliftcluster.pjesp.mongodb.net/?retryWrites=true&w=majority&appName=LearnLiftCluster";

const dbconnect = () => {
  try {
    mongoose.connect(con_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = dbconnect;
