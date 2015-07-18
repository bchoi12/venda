var ref = new Firebase("https://venda.firebaseio.com/");

var sellerId;
// Create a callback which logs the current auth state

var auth = ref.getAuth();
function authDataCallback(authData) {
  if (authData) {
  	sellerId = authData.uid;
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }
}

ref.onAuth(authDataCallback);
// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.onAuth(authDataCallback);

var itemsRef = ref.child("items");
function addItem(auctionEndTime) {
	itemsRef.push({
		"status": "OPEN";
		"sellerId": sellerId;
		"closingTime": auctionEndTime;


	});
}
