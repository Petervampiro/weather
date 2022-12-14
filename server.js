// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 9000;
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log(`your server is running on port ${port}`);
});
app.get("/getData", (req, res) => {
  res.send(projectData);
});
app.post("/postData", (req, res) => {
  projectData = { 
    newData: req.body.data,
    temp: req.body.temp,
    feelings: req.body.content
  };
  res.send(projectData).end();
});
