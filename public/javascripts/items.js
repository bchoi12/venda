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
function addItem(auctionEndTime, itemName, itemType, inputPrice, minSuggestedPrice, description, imageUrls, sellerLocation) {
  if (sellerId !== null) {
    itemsRef.push({
      "status": "OPEN",
      "sellerId": sellerId,
      "closingTime": auctionEndTime,
      "name": itemName,
      "type": itemType,
      "currentBidPrice": inputPrice,
      "minimumSuggestedPrice": minSuggestedPrice,
      "description": description,
      "imageUrls": imageUrls,
      "sellerLocation": sellerLocation
    });
  } else {
    console.log("Error! user needs to be logged in to add an item!");
  }

}
