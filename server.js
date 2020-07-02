// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//GET route that returns the projectData object
app.get('/all', function(req, res){
  res.send(projectData);
});


// POST route
app.post('/WeatherData', function(req, res){
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.user_response = req.body.user_response;
  res.end();
  console.log(projectData);
});


//Spin up the server
app.listen('3000', function(){
  console.log('server running on port 3000');
});
