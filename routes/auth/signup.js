var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var ref = new Firebase("https://venda.firebaseio.com/");

router.post('/', function(req, res, next) {
  var formObjects = req.body;
  var password = formObjects.password;
  var inputEmail = formObjects.email;
	ref.createUser({
	  email    : inputEmail,
	  password : password
	}, function(error, userData) {
	  if (error) {
	    console.log("Error creating user:", error);
	    res.send("Could not create user");
	  } else {
		var errorCode = null;
	  	while (error === null) {
		  	ref.authWithPassword({
			  email    : inputEmail,
			  password : password
			}, function(error, authData) {
			  if (error) {
			  } else {
		    	error = true;
		    	res.render('search');
			  }
			}, {
				remember: "sessionOnly"
			});	  		
	  	}
	    console.log("Successfully created user account with uid:", userData.uid);
	  }
	});	
});

module.exports = router;