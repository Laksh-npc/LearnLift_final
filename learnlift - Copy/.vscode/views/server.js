const express = require("express");
const app = express();
const path = require("path");

// Set view engine to EJS

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
