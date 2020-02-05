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
    brackets: [
        {
            slug: !String, // Unique
            name: !String,
            whitelist: {
                active: !Boolean,
                users: ![!ID] // Player IDs
            },
            blacklist: {
                active: !Boolean,
                users: ![!ID] // Player IDs
            },
            active: !Boolean
        }
    ]
}