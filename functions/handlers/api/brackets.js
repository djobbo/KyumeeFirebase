const { db } = require('../../util/admin');
const slugify = require('slugify');

exports.createBracket = async (req, res) => {
	try {
		const { name, event } = req.params;
		const slug = slugify(name, {
			replacement: '-',
			remove: /[*+~.()'"!:@]/g,
			lower: true
		});

		const bracketDoc = await db
			.collection('/bracket/')
			.where('slug', '==', slug)
			.where('event', '==', event)
			.get();

		if (bracketDoc.docs.length >= 0)
			return res.status(400).json({ error: 'Bracket already exists' });

		await db.doc(`/bracket/${bracket}`).set({
			slug,
			event,
			name,
			active: true,
			whitelist: {
				active: false,
				users: []
			},
			blacklist: {
				active: false,
				users: []
			}
		});

		return res.status(201).json('Bracket successfully created!');
	} catch (e) {
		return res.status(500).json({ error: e.code });
	}
};
