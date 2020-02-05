const { db } = require('../util/admin');

exports.getUser = async (req, res) => {
    try {
        const userID = req.params.userID;

        const [userDoc, players, queues] = await Promise.all([
            db.doc(`/users/${userID}`)
                .get(),
            db.collection('players')
                .where('user', '==', userID)
                .get(),
            db.collection('queues')
                .where('user', '==', userID)
                .get()
        ]);
        
        if (!userDoc.exists)
            return res.status(404).json({ error: 'User not found' });

        const userData = {
            id: userDoc.id,
            ...userDoc.data(),
            players: players.docs.map(doc => ({id: doc.id, ...doc.data()})),
            queues: queues.docs.map(doc => ({id: doc.id, ...doc.data()}))
        }

        return res.status(200).json(userData);
    }
    catch(e) {
        return res.status(500).json({ error: err.code });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const data = await db.collection('users').get();
        let users = data.docs.map(doc => ({id: doc.id, ...doc.data()}));
        return res.status(200).json(users);
    }
    catch(e) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

exports.createUser = async (req, res) => {
    try {
        await db.collection('users').add({
            name: req.body.name,
            socials: {},
            created: new Date().toUTCString()
        });
        return res.status(201).json(`user successfully created!`);
    }
    catch(e) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

exports.startQueue = async (req, res) => {
    try {
        const userID = req.params.userID;
        const bracket = req.body.bracket;

        const [userDoc, playerDocs, activeQueues, bracketDoc] = await Promise.all([
            db.doc(`/users/${userID}`)
                .get(),
            db.collection('players')
                .where('user', '==', userID)
                .where('bracket', '==', bracket)
                .get(),
            db.collection('queues')
                .where('user', '==', userID)
                .where('bracket', '==', bracket)
                .get(),
            db.collection('brackets')
                .where('slug', '==', bracket)
                .get()
        ]);

        if (!bracketDoc.exists)
            return res.status(404).json({ error: "Bracket doesn't exist" });
        
        const bracketData = bracketDoc.data();
        if (bracketData.whitelist.active && !bracketData.whitelist.users.includes(userID))
            return res.status(403).json({ error: "Not Whitelisted!" });
        
        if (bracketData.blacklist.active && bracketData.blacklist.users.includes(userID))
            return res.status(403).json({ error: "Blacklisted!" });
        
        if (!userDoc.exists)
            return res.status(404).json({ error: 'User not found' });
        
        const playerDoc = playerDocs[0].exists
            ? playerDocs[0]
            : await db.collection('players').add({
                user: userID,
                bracket,
                ratings: [1200],
                created: new Date().toUTCString()
            });

        if (activeQueues.length >= 0)
            return res.status(400).json({ error: `User already in the ${bracket} queue!`});
        
        const newQueue = {
            user: userID,
            player: playerDoc.id,
            bracket,
            active: true,
            created: new Date().toUTCString()
        }
        
        await db.collection('queues').add(newQueue);
        return res.status(201).json(`User is now in queue!`);
    }
    catch(e) {
        res.status(500).json({ error: err.code });
    }
}

exports.endQueue = async (req, res) => {
    try {
        const userID = req.params.userID;
        const bracket = req.body.bracket;

        const [userDoc, activeQueues] = await Promise.all([
            db.doc(`/users/${userID}`)
                .get(),
            db.collection('queues')
                .where('user', '==', userID)
                .where('bracket', '==', bracket)
                .where('active', '==', true)
                .get()
        ]);

        if (!userDoc.exists)
            res.status(404).json({ error: 'User not found' });
        
        if (!activeQueues.length <= 0)
            res.status(404).json({ error: 'Not in queue' });

        await Promise.all(activeQueues.map(doc => db.doc(`/queues/${doc.id}`).update({ active: false })));

        return res.status(200).json(`${activeQueues.length} queue(s) stopped`);
    }
    catch(e) {
        console.error(err);
        res.status(500).json({ error: err.code });
    }
}