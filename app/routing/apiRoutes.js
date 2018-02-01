var friends = require('../data/friends');

module.exports = function(app){
	
		app.get('/api/friends',function(req,res) { 
			res.json(friends);
		});
		app.post('/api/friends',function(req,res) {
			console.log('Post request received on /api/friends');
			console.log('Body Scores:',req.body['scores[]']);
			var userScores = req.body['scores[]'];
			var newFriend = {
				name: req.body.name,
				photo: req.body.photo,
				scores: userScores
			};
			var friendMatch = [];
			console.log('Comparing to friends...');
			for (var i = 0; i < friends.length; i++) {
				console.log('Friend: ',friends[i]);
				var totalDifference = 0;
				
				for (var j = 0; j < friends[i].scores.length; j++) {
					totalDifference += Math.abs(friends[i].scores[j] - userScores[j]);
				}
				console.log('Total Difference',totalDifference);
				if (friendMatch.length > 0) {
					if (totalDifference < friendMatch[0]) {
						friendMatch[0] = totalDifference;
						friendMatch[1] = friends[i];
					}
				} else {
					friendMatch[0] = totalDifference;
					friendMatch[1] = friends[i];
				}
			}
			console.log('Final Match: ',friendMatch[1]);
			friends.push(newFriend);
			console.log('Added new friend: ',friends);
			res.json(friendMatch[1]);
		});
};