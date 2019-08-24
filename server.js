/*Main Server Entry Point */
const express = require("express");
const connectDB = require("./config/db");

//Initialize Express
const app = express();
//Connect Database
connectDB();

const PORT = process.env.PORT || 5000; //Looks for environment variable 'PORT'

// Endpoint Routes
app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
