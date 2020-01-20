const { db } = require('../util/admin');

exports.getUser = (req, res) => {
	let userData = {};
	db.doc(`/users/${req.params.userID}`)
		.get()
		.then(doc => {
			if (!doc.exists) res.status(404).json({ error: 'User not found' });
			userData = doc.data();
			userData.userID = doc.id;
			return db
				.collection('players')
				.where('userID', '==', req.params.userID)
				.get();
		})
		.then(data => {
			userData.players = data.docs.map(doc => doc.data());
			return res.json(userData);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: err.code });
		});
};

exports.getAllUsers = (req, res) => {
	db.collection('users')
		.get()
		.then(data => {
			console.log(data);
			let users = data.docs.map(doc => doc.data());
			res.json(users);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Something went wrong' });
		});
};

exports.createUser = (req, res) => {
	const newUser = {
		name: req.body.name,
		socials: {}
	};
	db.collection('users')
		.add(newUser)
		.then(doc => {
			res.status(201).json(`user ${doc.id} successfully created!`);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Something went wrong' });
		});
};

exports.addPlayer = (req, res) => {
	//TODO: Make base rating a variable in a "bracket" document
	const newPlayer = {
		bracket: req.body.bracket,
		ratings: [1200]
	};

	db.doc(`/users/${req.params.userID}`)
		.get()
		.then(doc => {
			if (!doc.exists) res.status(404).json({ error: 'User not found' });
			return db
				.collection('players')
				.where('userID', '==', req.params.userID)
				.where('bracket', '==', req.body.bracket);
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
