/* https://dynamitetechnology.medium.com/how-to-render-html-file-in-express-js-616d244b8e27 */

const path = require("path");
const express = require("express");
const app = express();

// Define the directory where your static files (including HTML) are located
app.use(express.static(path.join(__dirname, "public")));

// Start the server
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
