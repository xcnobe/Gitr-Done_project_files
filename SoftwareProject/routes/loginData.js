var express = require('express');
var db = require('../database');
var app = express();
var session = require('express-session');
module.exports = app;

app.use(session({secret: "myKey"}));

app.post('/login', function (request, response) {
    var item = {
        // sanitize() is a function used to prevent Hackers from inserting
        // malicious code(as data) into our database. There by preventing
        // SQL-injection attacks.
        email: request.sanitize('emailLog').escape().trim(),
        pw: request.sanitize('pwsLog').escape().trim(),
    };
    var query = 'SELECT * FROM users WHERE email = \''+ item.email + '\'';
    db.any(query)
    	.then(function (row) {
    		if((row.length != 0) && (row[0].pw === item.pw)) {
			    if (row[0].firstname != '') {
			    	request.session.name = row[0].firstname;
			    } 
			    else {
			    	request.session.name = row[0].email;
			    }
			    request.session.myid = row[0].id;
			    response.render('eventsPage', {name: request.session.name, message: ''});
		    }
		    else {
		    	console.log('Email/Pw Not Found');
				response.render('loginCalendar', {error:"Email or password don't match"});
		    }
		})
		.catch(function (err) {
			console.log('Error');
			request.flash('Error', err);
			response.redirect('/');
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
        conpw: request.sanitize('conpw').escape().trim(),
    };
    console.log(item.email);
    var query = "SELECT * FROM users WHERE email = '" + item.email + "'";
    console.log(db.one(query));
    db.any(query)
    	.then(function (row) {
    		if(row.length === 0) {
    			if(item.conpw == item.pw) {
				    if (item.fName != '') {
				    	request.session.name = item.fName;
				    } else {
				    	request.session.name = item.email;
				    }
				    // Running SQL query to insert data into the store table
				    db.none('INSERT INTO users(firstname, lastname, email, pw) VALUES($1, $2, $3, $4)', [item.fName, item.lName, item.email, item.pw])
				        .then(function (result) {
				        	db.any("SELECT * FROM users WHERE email = '" + item.email + "'")
				        		.then(function(row) {

						        	request.session.myid = row[0].id;
						            response.render('eventsPage', {name: request.session.name, message: ''});
						            console.log('In success');

						        }).catch(function(err) {
						        	console.log('Error');
									response.redirect('/');
						        })

				        }).catch(function (err) {
				        	console.log('In Failure');
				        	response.redirect('/')
				    	})
				}
				else {
					response.render('loginCalendar', {error: "Passwords don't match"});
				    console.log('Passwords don\'t match');
				}
			}
		    else {
		    	console.log('Email already used');
				response.render('loginCalendar', {error:"Email already in use"});
		    }
		})
		.catch(function (err) {
			console.log('Error');
			response.redirect('/');
		})
});
app.post('/addEvent', function (request, response) {
	var item = {
        event: request.sanitize('event').escape().trim(),
        location: request.sanitize('location').escape().trim(),
        date: request.sanitize('date').escape().trim(),
        stime: request.sanitize('stime').escape().trim(),
        etime: request.sanitize('etime').escape().trim(),
	};

	db.none('INSERT INTO events(id, name, location, date, starttime, endtime) VALUES($1, $2, $3, $4, $5, $6)', [request.session.myid, item.event, item.location, item.date, item.stime, item.etime])
		.then(function(result) {
			console.log('success');
			response.render('eventsPage', {name: request.session.name, message: 'Successfully Added Event'});
		}).catch(function (err) {
			consle.log('Failure');
			response.render('eventsPage', {name: request.session.name, message: 'Failed to Add Event'});
		})
});
app.get('/logout', function (request, response) {
	request.session.destroy(function(err) {
		if (err) {
			response.negotiate(err);
		}

		response.redirect('/');
	})
});






