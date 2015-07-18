var ref = new Firebase("https://fiery-torch-745.firebaseio.com");

function Error(msg) {
  $('#error').html('msg');
}

var authId;
function authDataCallback(authData) {
  if (authData) {
  	authId = authData.uid;
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    authId = null;
    console.log("User is no longer logged in!");
  }
}

ref.onAuth(authDataCallback);

