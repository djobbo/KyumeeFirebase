const db = {
	users: [
		{
			id: !ID, // Unique
			name: !String,
			socials: [
				{
					name: !String,
					id: !String
				}
			]
		}
	],
	players: [
		{
			id: !ID, // Unique
			user: !ID,
			bracket: !String,
			ratings: ![!Number]
		}
	],
	queues: [
		{
			id: !ID, // Unique
			user: !ID,
			player: !ID,
			bracket: !String,
			active: !Boolean,
			date: !String
		}
	],
	teams: [
		{
			id: !ID, // Unique
			players: [
				{
					id: !ID,
					rating: !Number
				}
			],
			bracket: !String
		}
	],
	matches: [
		{
			id: !ID, // Unique
			teams: [
				{
					players: [
						{
							id: !ID,
							rating: !Number
						}
					],
					rating: !Number,
					score: !Number
				}
			],
			active: !Boolean,
			confirmed: !Boolean
		}
	],
	events: [
		{
			slug: !String, // Unique
			name: !String
		}
	],
	brackets: [
		{
			slug: !String, // Unique
			event: !ID,
			name: !String,
			active: !Boolean,
			whitelist: {
				active: !Boolean,
				users: ![!ID] // Player IDs
			},
			blacklist: {
				active: !Boolean,
				users: ![!ID] // Player IDs
			},
			specs: {
				rating_system: !RatingSystem, // Fixed, Elo
				starting_rating: !Number,
				type: !BracketType // BH1v1, BH2v2
			}
		}
	]
};
