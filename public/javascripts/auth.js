var ref = new Firebase("https://venda.firebaseio.com/");

// Functiont that checks if the user is logged in
function isLoggedIn(authData) {
  if (authData) {
  	// user is logged in
    return true
  } else {
  	// user is not logged in
  	return false
  }
}

// Register the callback to be fired every time auth state changes
// Use the below function call for this
// ref.onAuth(isLoggedIn);

function createAccount(user, pass) {
	ref.createUser({
		email: user,
		password: pass
	}, function(error, userData)  {
		if (error) {
		    console.log("Error creating user:", error);
		    return false;
		} else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    return true;
		}
	});
};

function login(user, pass) {
  ref.authWithPassword({
	  email    : user,
	  password : pass
	}, function(error, authData) {
	  if (error) {
	  	console.log("error on login");
	  	switch (error.code) {
	  		case "INVALID_EMAIL":
	  			$('#error').html('Invalid email!');
	  			break;
	  		case "INVALID_PASSWORD":
	  			$('#error').html('Password is invalid!');
	  			break;
	  		case "INVALID_USER":
	  			$('#error').html('User is invalid!');
	  			break;
	  		default:
	  			$('#error').html('Login failed for unknown reasons!');
	  			break;
	  	}
	  } else {
    	console.log("Authenticated successfully with payload:", authData);
    	res.render('search');
	  }
	}, {
		remember: "sessionOnly"
	});
};

var loginFacebookPopup = function() {
	ref.authWithOAuthPopup("facebook", function(error, authData) {
	  if (error) {
	    console.log("Login to Facebook failed!", error);
	    return false;
	  } else {
	    console.log("Authenticated successfully with facebook with payload:", authData);
	    return true;
	  }
	}, {
		remember: "sessionOnly"
	});
};

var logout = function() {
	ref.unauth();
}
