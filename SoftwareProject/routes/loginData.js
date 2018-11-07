var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.post('/addEvent', function (request, response) {
	var item = {
        event: request.sanitize('event').escape().trim(),
        location: request.sanitize('location').escape().trim(),
        date: request.sanitize('date').escape().trim(),
        stime: request.sanitize('stime').escape().trim(),
        etime: request.sanitize('etime').escape().trim(),
	};

	db.none('INSERT INTO events(name, locatioin, date, starttime, endtime) VALUES($1, $2, $3, $4, $5)', [item.event, item.location, item.date, item.stime, item.etime])
		.then(function(result) {
			console.log('success');
			response.render('eventsPage');
		}).catch(function (err) {
			consle.log('Failure');
		})
});

app.post('/', function (request, response) {
    var email = request.body.emailLog;
    var password = request.body.pwsLog;
    db.any('select id, email from users where email = \'' + email + '\' and pw = \'' + password + '\'')
        .then(function (result) {
            if (result.length > 0) {
                response.render('eventsPage', { userEmail: email});
            } else {
		console.log('incorrect login information');
                response.render('loginCalendar');
            }
        })
        .catch(function (err) {
            // display error message in case an error
            console.log('Login error');
        })
});

app.post('/SignUp', function (request, response) {
    var item = {
        // sanitize() is a function used to prevent Hackers from inserting
        // malicious code(as data) into our database. There by preventing
        // SQL-injection attacks.
        fName: request.sanitize('fName').escape().trim(),
        lName: request.sanitize('lName').escape().trim(),
        email: request.sanitize('email').escape().trim(),
        pw: request.sanitize('pw').escape().trim(),
    };
        // Running SQL query to insert data into the store table
    db.none('INSERT INTO users(firstname, lastname, email, pw) VALUES($1, $2, $3, $4)', [item.fName, item.lName, item.email, item.pw])
        .then(function (result) {

            request.flash('success', 'Data added successfully!');
            response.render('eventsPage');
            console.log('In success');

        }).catch(function (err) {
        	request.flash('error', err);
        	console.log('In Failure');
    })
});
