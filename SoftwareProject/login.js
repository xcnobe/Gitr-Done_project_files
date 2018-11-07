var express = require('express');
var app = express();

app.get('/', function (request, response) {
	console.log('Here I am!')
   // response.redirect('/loginCalendar.html');
   response.send('Done!');
});

module.exports = app;