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



var createAccount