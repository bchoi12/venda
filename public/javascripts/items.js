var ref = new Firebase("https://venda.firebaseio.com/");

var sellerId;
// Create a callback which logs the current auth state

function authDataCallback(authData) {
  if (authData) {
  	sellerId = authData.uid;
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    sellerId = null;
    console.log("User is no longer logged in!");
  }
}

ref.onAuth(authDataCallback);

var itemsRef = ref.child("items");


function setMeetingLocation(itemId, time, loc) {
  meetupTimeRef = ref.child('items').child(itemId);
  meetupTimeRef.update({meetupTime: time, meetupLocation: loc});
}

function bidItem(itemId, price) {

  itemToBid = ref.child('items').child(itemId);
  itemToBid.on("currentBidPrice", function(snapshot) {
    var curPrice = snapshot.val();
    if (curPrice >= price) {
      console.log("Could not bid on the price. Bidding price is too low!");
      // Insert jquery here for giving the user an error
    } else {
      itemToBid.update({ currentBidPrice: price });
      console.log("Successfully bid on the price! New price is : " + price);
      // Insert jquery telling the user that the bid went through.

    }
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

}
