/*Main Server Entry Point */
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB(); //Connecting Database - db.js

// Middleware for express
app.use(express.json({ extended: false })); // Gets data from req.body

const PORT = process.env.PORT || 5000; //Looks for environment variable 'PORT'

// Endpoint Routes
app.get("/", (req, res) => {
  res.send("API running");
});

// Define Routes - routes/api
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
