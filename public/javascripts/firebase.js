var ref = new Firebase("https://venda.firebaseio.com/");
// var ref = new Firebase("https://fiery-torch-745.firebaseio.com");
var usersRef = ref.child("users");
var itemsRef = ref.child("items");
var searchRef = ref.child("itemLookup")
var authId = "6789";

function Error(msg) {
  $('#error').html(msg);
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
    var wordObject = {};
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
      var wordList = name.split(" ");
      var listLen = wordList.length;
      for (var i = 0l i < listLen; i++) {
        wordObject[wordList[i]] = itemId.key();

      }
    })
    
    for (var key in wordObject) {
      wordRef = searchRef.child(key);
      wordRef.update({wordObject[key] : true});
    }

  } else {
    Error("Error! user needs to be logged in to add an item!");
  }
};

function addImage(itemId, imageUrl) {
  var imagesRef = itemsRef.child(itemId).child("imageUrls");
  imagesRef.push({
    imageUrls: imageUrl
  });
}

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

// clientCallback to get current bid price
function getItemCurrentBidPrice(itemId, clientCallback) {
  var bidPriceRef = itemsRef.child(itemId).child("currentBidPrice");
  bidPriceRef.on("value", function(data) {
    clientCallback(data.val());
  })
};

function itemNameLookup(words) { 
  var wordSet = new Set(words);
  
  
}

// clientCallback to get the bid price
function getItemStatus(itemId, clientCallback) {
  var itemRef = itemsRef.child(itemId).child("status");
  itemRef.on("value", function(data) {
    clientCallback(data.val());
  })
}

function updateItemStatus(itemId, status) {
  var itemRef = itemsRef.child(itemId);
  itemRef.update({
      "status": status
  })
}

function closeItem(itemId) {
  updateItemStatus(itemId, "CLOSED");
}

function setOnHoldItem(itemId) {
  updateItemStatus(itemId, "ON HOLD");
}

function getItemSellerId(itemId, clientCallback) {
  var itemRef = itemsRef.child(itemId).child("sellerId");
  itemRef.on("value", function(data) {
    clientCallback(data.val());
  })
}

function getItemClosingTime(itemId, clientCallback) {
  var itemRef = itemsRef.child(itemId).child("closingTime");
  itemRef.on("value", function(data) {
    clientCallback(data.val());
  })
}

function getItem(itemId) {
  var itemRef = itemsRef.child(itemId);
  itemRef.on("value", function(data) {
    clientCallback(data.val());
  })
}

function getTopKItemsLeastCost(k, type, clientCallback) {
  var tempRef = ref.child("temp");
  itemsRef.orderByChild("type").equalTo(type).on("value", function(snapshot) {
    tempRef.set({})
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
      console.log(data.key());
      console.log(data.val());
      console.log(data.val().currentBidPrice);
      // list format
      // temp = {};    
      // temp[data.key()] = data.val().currentBidPrice;
      // tempRef.update(temp);
      tempRef.push({
        pushId: data.key(),
        currentBidPrice: data.val().currentBidPrice,
        item: data.val()
      });
    });
    console.log("--------------------------------------------")
    tempRef.orderByChild("currentBidPrice").limitToFirst(3).on("value", function(snapshot2) {
      console.log(snapshot2.key());
      // clientCallback(snapshot2.val().item)
    })
  });
}

  // itemsRef.orderByChild("currentBidPrice").on("child_added", function(snapshot) {
  //   snapshot.forEach(function(data) {
  //     alert(data);
  //   });
  // });