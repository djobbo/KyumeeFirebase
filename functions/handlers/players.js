const { db } = require('../util/admin');

exports.getPlayer = async (req, res) => {
	const playerID = req.params.playerID;
    let playerData = {};
    try {
        const doc = await db.doc(`/players/${playerID}`).get()
        if (!doc.exists)
            res.status(404).json({ error: 'Player not found' });
        playerData = doc.data();
        playerData.playerID = doc.id;
        const data = await db
            .collection('queues')
            .where('player', '==', playerID)
            .get();
        playerData.queues = data.docs.map(doc => doc.data());
        return res.status(200).json(playerData);
    }
    catch(e) {
        console.error(err);
        res.status(500).json({ error: err.code });
    }
};

exports.updatePlayer = (req, res) => {
	const playerID = req.params.playerID;
	db.doc(`/players/${playerID}`)
		.set(req.body)
		.then(_ => {
			res.status(200).json({ message: 'Player updated successfully' });
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: err.code });
		});
};

exports.startQueue = (req, res) => {
	const playerID = req.params.playerID;
	const bracket = req.body.bracket;

	//TODO: Make base rating a variable in a bracket document
	const newQueue = {
		player: playerID,
		bracket,
		active: true,
		date: new Date().toISOString()
	};

	//TODO: Check if bracket exists too
	db.doc(`/players/${playerID}`)
		.get()
		.then(doc => {
			if (!doc.exists)
				res.status(404).json({
					error: 'Player not found (User not in bracket)'
				});
			return db
				.collection('queues')
				.where('player', '==', playerID)
				.where('bracket', '==', bracket)
				.where('active', '==', true)
				.get();
		})
		.then(doc => {
			if (doc.exists)
				res.status(400).json({ error: 'Player already in queue' });
			return db.collection('queues').add(newQueue);
		})
		.then(doc => {
			res.status(201).json({ id: doc.id, newQueue });
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: err.code });
		});
};

exports.endQueue = (req, res) => {
	const playerID = req.params.playerID;
	const bracket = req.body.bracket;

	//TODO: Check if bracket exists too
	db.collection('queues')
		.where('player', '==', playerID)
		.where('bracket', '==', bracket)
		.where('active', '==', true)
		.get()
		.then(data => {
			const promises = [];
			if (data.docs.length <= 0)
				res.status(400).json({ error: 'Player not queueing' });
			data.forEach(doc => {
				promises.push(
					db.doc(`/queues/${doc.id}`).set({ active: false })
				);
			});
			return Promise.all(promises);
		})
		.then(_ => {
			res.status(200).json({ message: 'successfuly dequeued' });
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: err.code });
		});
};
