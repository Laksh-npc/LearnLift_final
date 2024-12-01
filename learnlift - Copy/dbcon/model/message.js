const mongoose = require("mongoose");

// Define the schema for messages
const messageSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const Message = mongoose.model("Message", messageSchema);

// Function to create a new message
const createMessage = async (data) => {
  try {
    const message = new Message(data);
    await message.save();
    console.log("Message saved successfully");
    return message;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

// Function to fetch all messages
const getAllMessages = async () => {
  try {
    return await Message.find();
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// Function to delete a message
const deleteMessage = async (id) => {
  try {
    return await Message.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

module.exports = { createMessage, getAllMessages, deleteMessage };