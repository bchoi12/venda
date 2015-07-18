var ref = new Firebase("https://fiery-torch-745.firebaseio.com");

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

function getAllBids() {
	
}

function getItemById(id) {
	itemRef = ref.child('items');
	itemRef.on(id, function (snapshot) {
		var entireItem = snapshot.val();
		var imgUrls = entireItem.imgUrls;
		var singleImgUrl;
		for (firstObj in imgUrls) {
			singleImgUrl = imgUrls.firstObj;
			break;
		}
		var relevantInfo;
		if (entireItem.status === "OPEN") {
			relevantInfo = {
				status: "OPEN"
				itemId: id,
				closingTime: entireItem.closingTime;
				bidPrice: entireItem.currentBidPrice;
				itemName: entireItem.name;
				imgUrl: singleImgUrl;
			}
		} else if (entireItem.status === "ON HOLD") {
			relevantInfo = {
				status: "ON HOLD"
				itemId: id,
				bidPrice: entireItem.currentBidPrice;
				itemName: entireItem.name;
				imgUrl: singleImgUrl;
				meetupTime: entireItem.meetupTime;
				meetupLocation: entireItem.meetupLocation;
			}
		} else {
			relevantInfo = {
				status: "COMPLETED"
				bidPrice: entireItem.currentBidPrice;
				itemName: entireItem.name;
				imgUrl: singleImgUrl;
			}
		}
		return relevantInfo;
	}, function(error) {
		console.log("ERROR TRYING TO GET THE ITEM BY THAT ID!");
		return { error: "ERROR" };
	});
}

function getAllItems() {
	myItemsRef = ref.child('users').child(authId);
	var itemsList = [];
	myItemsRef.on('myItems', function(snapshot) {
		var keyList = Object.getKeys(snapshot.val);
		keyList.forEach(function(keyId) {
			var item = getItemById(keyId);
			itemsList.push(item);
		});
		return itemList;

	}, function(error) {
		console.log('Could not get your items! ERROR')
		// Insert jquery for error logic
		return null;
	});
}