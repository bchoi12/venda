// var ref = new Firebase("https://venda.firebaseio.com/");
var ref = new Firebase("https://fiery-torch-745.firebaseio.com");
var usersRef = ref.child("users");
var itemsRef = ref.child("items");

function setUser(userId, name) {
  usersRef.child(userId).set({
    "name": name,
    "currentLocation": {
      "longitude": -1,
      "latitude": -1
    },
    "generalRating": {
      "numRatings": 0,
      "ratingsSum": 0
    },
    "myItems": { },
    "myBids": { }
  });
};

function updateUserLocation(userId, longitude, latitude) {
  var userLocationRef = usersRef.child(userId).child("currentLocation");
  userLocationRef.update({
    "longitude": longitude,
    "latitude": latitude
  });
};

function addUserRating(userId, rating) {
  var userNumRatingsRef = usersRef.child(userId).child("generalRating").child("numRatings");
  userNumRatingsRef.transaction(function (current_value) {
    // console.log(current_value);
    return current_value + 1;
  });
  var userSumRatingsRef = usersRef.child(userId).child("generalRating").child("ratingsSum");
  userSumRatingsRef.transaction(function(current_value) {
    return current_value + rating;
  });
};

// clientCallback to update average
function getRating(userId, clientCallback) {
  // console.log("userID: " + userId);
  var userNumRatingsRef = usersRef.child(userId).child("generalRating").child("numRatings");
  var userSumRatingsRef = usersRef.child(userId).child("generalRating").child("ratingsSum");
  var numRatings;
  var sumRatings;
  userNumRatingsRef.on("value", function(data) {
    numRatings = data.val();
    userSumRatingsRef.on("value", function(data) {
      sumRatings = data.val();
      // console.log("numRatings: " + numRatings);
      // console.log("sumRatings: " + sumRatings);
      var average = (sumRatings/numRatings).toFixed(2);
      clientCallback(average);
    });
  });
};

function updateMyItem(userId, itemId) {
  var itemRef = usersRef.child(userId).child("myItems");
  temp = {};
  temp[itemId] = true;
  itemRef.update(temp);
};

function updateBidItem(userId, itemId, price) {
  var itemRef = usersRef.child(userId).child("myBids");
  temp = {};
  temp[itemId] = price;
  itemRef.update(temp);
};

// clientCallback to update price
function getBidItemPrice(userId, itemId, clientCallback) {
  var itemRef = usersRef.child(userId).child("myBids").child(itemId);
  itemRef.on("value", function(data) {
    clientCallback(data.val());
  })
};

function getUserLocation(userId, clientCallback) {
  var userLocationRef = usersRef.child(userId).child("currentLocation");
  userLocationRef.on("value", function(data) {
    clientCallback(data.val());
  })
};

// Item
function addItem(sellerId, closingTime, name, type, minimumSuggestedPrice, description) {
  if (sellerId !== null) {
    getUserLocation(sellerId, function(sellerLocation) {
      itemsRef.push({
        status: "OPEN",
        sellerId: sellerId,
        closingTime: closingTime,
        name: name,
        type: type,
        currentBidPrice: -1,
        minimumSuggestedPrice: minimumSuggestedPrice,
        description: description,
        sellerLocation: sellerLocation
      });
    })
  } else {
    console.log("Error! user needs to be logged in to add an item!");
  }
};



