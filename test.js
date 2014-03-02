// Require Dependencies
var express = require('express');
var app = express();

// Middleware
app.use(app.router); // you need this line so the .get etc. routes are run and if an error within, then the error is parsed to the ned middleware (your error reporter)
app.use(function(err, req, res, next) {
    if(err && err == '403') {
      console.log("Not Found Error");
      res.send("Not Found Error");
    }
    else
      next(); // you also need this line
});

// Routes
app.get('/', function(request, response) {
    throw "403";
    response.send('Hello World!');
});

// Listen
app.listen(3000, function() {
  console.log("Listening on 3000");
});
