// Require Dependencies
var express = require('express');
var app = express();

// Middleware
app.use(app.router); // you need this line so the .get etc. routes are run and if an error within, then the error is parsed to the ned middleware (your error reporter)
app.use(function(err, req, res, next) {
    console.log(err);
    console.log('something');
    if(err) {
      console.log("Found Error");
      res.send("Found Error");
    }
    else
      next(); // you also need this line
});

// Routes
app.get('/', function(request, response, next) {
    next('Passed Error');
});

// Listen
app.listen(3000, function() {
  console.log("Listening on 3000");
});
