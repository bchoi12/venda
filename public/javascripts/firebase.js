// var ref = new Firebase("https://venda.firebaseio.com/");
var ref = new Firebase("https://venda.firebaseio.com");
var usersRef = ref.child("users");
var itemsRef = ref.child("items");
var authId = "6789";

function Error(msg) {
  // $('#error').html('msg');
  console.log(msg);
}

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

// clientCallback updates the name
function getUserName(userId, clientCallback) {
  var nameRef = usersRef.child(userId).child("name");
  nameRef.on("value", function(data) {
    clientCallback(data.val());
  })
}

function updateUserLocation(longitude, latitude) {
  if (authId !== null && authId !== undefined) {
    var userLocationRef = usersRef.child(authId).child("currentLocation");
    userLocationRef.update({
      "longitude": longitude,
      "latitude": latitude
  })} else {
    Error("Error! user needs to be logged in to update location!");
  }
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

function updateMyItem(itemId) {
    //login Error
  if (authId !== null && authId !== undefined) {
    var itemRef = usersRef.child(authId).child("myItems");
    temp = {};
    temp[itemId] = true;
    itemRef.update(temp);
  } else {
     Error("Error! user needs to be logged in to update selling items!");
  }
};

function updateBidItem(itemId, price) {
  if (authId !== null && authId !== undefined) {
    var itemRef = usersRef.child(authId).child("myBids");
    temp = {};
    temp[itemId] = price;
    itemRef.update(temp);
  } else {
    Error("Error! user needs to be logged in to update bid of an item!");
  }
};

// clientCallback to update price
function getMyBidPriceOnItem(itemId, clientCallback) {
  var myBidRef = usersRef.child(authId).child("myBids").child(itemId);
  myBidRef.on("value", function(data) {
    clientCallback(data.val());
  })
};

function getUserLocation(userId, clientCallback) {
  var userLocationRef = usersRef.child(userId).child("currentLocation");
  userLocationRef.on("value", function(data) {
    clientCallback(data.val());
  })
};

// Items
function addItem(closingTime, name, type, minimumSuggestedPrice, initialBidPrice, description) {
  if (authId !== null && authId !== undefined) {
    var sellerLocation = "10";
    getUserLocation(authId, function(sellerLocation) {
      var itemId = itemsRef.push({
        status: "OPEN",
        sellerId: authId,
        closingTime: closingTime,
        name: name,
        type: type,
        currentBidPrice: initialBidPrice,
        minimumSuggestedPrice: minimumSuggestedPrice,
        description: description,
        sellerLocation: sellerLocation
      });
      updateMyItem(itemId.key());
    })
  } else {
    Error("Error! user needs to be logged in to add an item!");
  }
};

function setMeetingLocation(itemId, time, loc) {
  meetupTimeRef = itemsRef.child(itemId);
  meetupTimeRef.update({meetupTime: time, meetupLocation: loc});
}

function bidItem(itemId, price) {
  if (authId !== null && authId !== undefined) {
    itemToBid = itemsRef.child(itemId);
    itemToBid.on("value", function(snapshot) {
      var curPrice = snapshot.val();
      if (curPrice >= price) {
        console.log("Could not bid on the price. Bidding price is too low!");
        // Insert jquery here for giving the user an error
      } else {
        itemToBid.update({ currentBidPrice: price });
        updateBidItem(itemId, price);
        console.log("Successfully bid on the price! New price is : " + price);
        // Insert jquery telling the user that the bid went through.

      }
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  } else {
    Error("Error! user needs to be logged in to bid an item!"); 
  }
}

// clientCallback update current bid price
function getItemCurrentBidPrice(itemId, clientCallback) {
  var bidPriceRef = itemsRef.child(itemId).child("currentBidPrice");
  itemRef.on("value", function(data) {
    clientCallback(data.val());
  })
};

