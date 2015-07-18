{
	venda: {
		items: {
			:pushId: {
				status: "", // OPEN, ON HOLD, COMPLETED
				sellerId: "auth.uid",
				closingTime: 0,
				name: "",
				type: "",
				currentBidPrice: 0,
				minimumSuggestedPrice: 0,
				description: "",
				imageUrls: {
					:pushId: "url"
				},
				buyerId: : "auth.uid",
				meetupTime: 0,
				meetupLocation: {
					longitude: 0,
					latitude: 0
				},
				sellerLocation: {
					longitude: 0,
					latitude: 0
				}
			}
		},
		bids: {
			:itemPushId: {
				:price: {
					userId: auth.uid
				},
			}
		},
		itemLookup: {
			:word: {
				:itemId: true,
			}
		}
		users: {
			:userId { // auth.uid
				name: {

				},
				currentLocation: {
					logitude: 0,
					latitude: 0
				},
				generalRating: {
					numRatings: 0,
					ratingsSum: 0
				},
				myItems: {
					:itemId: true
				},
				myBids: {
					:bidId: "price"
				}
			}

		},

	}
}