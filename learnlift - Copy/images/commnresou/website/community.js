const API_URL = "http://localhost:3000/api/messages";
const COMMENT_URL = "http://localhost:3000/api/comments";

// Function to handle posting a new message
const postMessage = async () => {
  const postInput = document.getElementById("postInput");
  const content = postInput.value.trim();

  if (!content) {
    alert("Please type a message before posting.");
    return;
  }

  const messageData = {
    author: "Laksh Sharda", // Replace with actual author if available
    content: content,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error("Failed to post the message.");
    }

    const result = await response.json();
    console.log("Message posted successfully:", result);

    postInput.value = "";
    addPostToUI(result.data);
  } catch (error) {
    console.error("Error posting message:", error);
    alert("Failed to post the message. Please try again.");
  }
};

// Function to fetch all messages from the database
const fetchMessages = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch messages.");
    }

    const messages = await response.json();
    console.log("Fetched messages:", messages);

    messages.forEach(async (message) => {
      addPostToUI(message);
      await fetchComments(message._id, document.querySelector(`.post[data-id="${message._id}"] .comments-container`));
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    alert("Failed to load messages. Please try again later.");
  }
};

// Function to add a message dynamically to the UI
const addPostToUI = (message) => {
  const mainSection = document.querySelector(".main");

  const postElement = document.createElement("div");
  postElement.className = "post";
  postElement.setAttribute("data-id", message._id); // Set post ID for easy reference

  postElement.innerHTML = `
    <div class="header">
      <img src="C:\Users\dellk\Desktop\learnlift\images\commnresou\website\images\st4.jpg" alt="User's Profile Photo" class="profile-photo">
      <h3>${message.author}</h3>
    </div>
    <p>${message.content}</p>
    <div class="buttons-section">
      <button class="comment-button">Comments</button>
      <button class="impressions-button">Impressions</button>
      <button class="delete-button">Delete</button>
    </div>
    <div class="comment-section" style="display: none;">
      <textarea class="comment-input" placeholder="Write a comment..."></textarea>
      <button class="reply-button">Reply</button>
      <div class="comments-container"></div>
    </div>
  `;

  const commentButton = postElement.querySelector(".comment-button");
  const commentSection = postElement.querySelector(".comment-section");
  const commentInput = postElement.querySelector(".comment-input");
  const replyButton = postElement.querySelector(".reply-button");
  const commentsContainer = postElement.querySelector(".comments-container");
  const deleteButton = postElement.querySelector(".delete-button");

  // Toggle the visibility of the comment section
  commentButton.addEventListener("click", () => {
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
    fetchComments(message._id, commentsContainer); // Fetch comments for this post
  });

  // Add a new comment
  replyButton.addEventListener("click", async () => {
    const commentContent = commentInput.value.trim();

    if (!commentContent) {
      alert("Please write a comment before replying.");
      return;
    }

    const commentData = {
      postId: message._id,
      author: "Yugen jarwal", // Replace with actual author if available
      content: commentContent,
    };

    try {
      const response = await fetch(COMMENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to post the comment.");
      }

      const result = await response.json();
      console.log("Comment posted successfully:", result);

      commentInput.value = ""; // Clear the input box
      addCommentToUI(result.data, commentsContainer); // Add the new comment to the UI
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post the comment. Please try again.");
    }
  });

  // Delete the message and its comments from the UI and database
  deleteButton.addEventListener("click", async () => {
    const postId = postElement.getAttribute("data-id");

    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the message.");
      }

      // Remove the post and comments from the UI
      postElement.remove();
      console.log("Message deleted successfully from UI and database.");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete the message. Please try again.");
    }
  });

  mainSection.insertBefore(postElement, mainSection.children[1]);
};

// Function to fetch comments for a specific post
const fetchComments = async (postId, container) => {
  try {
    const response = await fetch(`${COMMENT_URL}/${postId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments.");
    }

    const comments = await response.json();
    console.log("Fetched comments:", comments);

    container.innerHTML = ""; // Clear existing comments
    comments.forEach((comment) => addCommentToUI(comment, container));
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

// Function to add a comment dynamically to the UI
const addCommentToUI = (comment, container) => {
  const commentElement = document.createElement("div");
  commentElement.className = "comment";

  commentElement.innerHTML = `
    <h4>${comment.author}</h4>
    <p>${comment.content}</p>
  `;

  container.appendChild(commentElement);
};

// Add event listener to the "Post" button
document.getElementById("postButton").addEventListener("click", postMessage);

// Fetch and display messages when the page loads
window.addEventListener("DOMContentLoaded", fetchMessages);
