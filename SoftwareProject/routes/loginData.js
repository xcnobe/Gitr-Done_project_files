var express = require('express');
var db = require('../database');
var app = express();
var session = require('express-session');
var nodemailer = require('nodemailer');
var https = require('axios');

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
			    request.session.useremail = row[0].email;
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
				    	request.session.useremail = item.email;
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
        temp: request.sanitize('temp').escape().trim(),
        icon: request.sanitize('icon').escape().trim(),
        sum: request.sanitize('sum').escape().trim(),
	};


	db.none('INSERT INTO events(userid, name, location, eventdate, starttime, endtime) VALUES($1, $2, $3, $4, $5, $6)', [request.session.myid, item.event, item.location, item.date, item.stime, item.etime])
		.then(function(result) {
			console.log('success');
			response.render('eventsPage', {name: request.session.name, message: 'Successfully Added Event'});
		}).catch(function (err) {
			console.log(err);
			console.log('Failure');
			response.render('eventsPage', {name: request.session.name, message: 'Failed to Add Event'});
		})

	console.log(item.temp);
	console.log(item.icon);
	console.log(item.sum);
	//Send Email
	// var transporter = nodemailer.createTransport({
	//   service: 'gmail',
	//   auth: {
	//     user: '',
	//     pass: ''
	//   }
	// });

	var mailOptions = {
	  from: 'jackmarty21@gmail.com',
	  to: request.session.useremail,
	  subject: 'Weather Update',
	  text: 'The weather in ' + item.location + ' is ' + item.sum + ' with a temperature of ' + Number(item.temp).toFixed(0) + ' degrees.',
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
});
app.get('/myEvents', function(request, response) {

	var query = 'SELECT * FROM events WHERE userid = ' + request.session.myid;

    db.any(query)
      	.then(function (rows) {
          // render views/store/list.ejs template file

          	if (rows.length != 0) {
	          	var dataToRender = [];
			  	rows.forEach(function(row) {
			  	var geocodeUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(row.location) + '&key=3d7f8606462b4cf0911585ab6ddea519';
			  	https.get(geocodeUrl).then(function(gResponse) {
			  		  	
		  			console.log(gResponse.data);
		  			var geocodeResponse = gResponse.data;

		  		  	var length = geocodeResponse.results.length;
					var lat = geocodeResponse.results[length - 1].geometry.lat;
					var long = geocodeResponse.results[length -1].geometry.lng;

					var tempUrl = 'https://api.darksky.net/forecast/c9265fa4ef46bbd5265f4ed915fd3d7b/' + lat + ',' + long;

					https.get(tempUrl).then(function(tempResponse) {

						var rowClone = JSON.parse(JSON.stringify(row));
						rowClone.temperature = Number(tempResponse.data.currently.temperature).toFixed(0);
						dataToRender.push(rowClone);
						
						if (dataToRender.length === rows.length) {
				        	response.render('list', {
				          		name: request.session.name,
				            	data: dataToRender,
				          });
						}
					}).catch(function(errors) {
						console.log(errors);
					});

			  	}).catch(function(errors){
			  		console.log(errors);
			  	});
			  });
			} else {
				response.render('eventsPage', {name: request.session.name, message: 'You do not have any events yet'});
			}
      })
      .catch(function (err) {
          // display error message in case an error
          response.render('eventsPage', {name: request.session.name, message: 'Cannot Open My Events :('})
      });
});
app.get('/eventPage', function (request, response) {
	response.render('eventsPage', {name: request.session.name, message: ''});
});
app.get('/logout', function (request, response) {
	request.session.destroy(function(err) {
		if (err) {
			response.negotiate(err);
		}

		response.redirect('/');
	})
});






