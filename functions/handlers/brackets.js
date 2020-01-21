const { db } = require('../util/admin');

exports.addPlayerInBracket = (req, res) => {
    const userID = req.body.userID;
    const bracket = req.params.bracket;

	//TODO: Make base rating a variable in a bracket document
	const newPlayer = {
        user: userID,
		bracket,
		ratings: [1200]
	};

    //TODO: Check if bracket exists too
	db.doc(`/users/${userID}`)
		.get()
		.then(doc => {
			if (!doc.exists) res.status(404).json({ error: 'User not found' });
			return db
				.collection('players')
				.where('userID', '==', userID)
				.where('bracket', '==', bracket);
		})
		.then(doc => {
			if (doc.exists)
				res.status(400).json({ error: 'Player already exists' });
			return db.collection('players').add(newPlayer);
		})
		.then(doc => {
			res.status(201).json({ id: doc.id, newPlayer });
		});
};

exports.getAllPlayersInBracket = (req, res) => {
    const bracket = req.params.bracket;

    exports.getAllUsers = (req, res) => {
	db.collection('players')
		.where('bracket', '==', bracket)
		.get()
		.then(data => {
			console.log(data);
			let players = data.docs.map(doc => doc.data());
			res.json(players);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Something went wrong' });
		});
    };
}