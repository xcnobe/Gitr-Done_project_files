var express = require('express');
var app = express();

app.get('/', function (request, response) {
   // render the views/index.ejs template file
   response.render('loginCalendar', {error: ''});

});

module.exports = app;