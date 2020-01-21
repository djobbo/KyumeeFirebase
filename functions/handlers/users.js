const { db } = require('../util/admin');

exports.getUser = (req, res) => {
    const userID = req.params.userID;
	let userData = {};
	db.doc(`/users/${userID}`)
		.get()
		.then(doc => {
			if (!doc.exists) res.status(404).json({ error: 'User not found' });
			userData = doc.data();
			userData.userID = doc.id;
			return db
				.collection('players')
				.where('userID', '==', userID)
				.get();
		})
		.then(data => {
			userData.players = data.docs.map(doc => doc.data());
			return res.status(200).json(userData);
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
			res.status(200).json(users);
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