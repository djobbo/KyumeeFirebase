const db = {
    users: [
        {
            id: !ID,
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
            id: !ID,
            user: !ID,
            bracket: !String,
            ratings: ![!Number]
        }
    ],
    queues: [
        {
            id: !ID,
            player: !ID,
            bracket: !String,
            active: !Boolean,
            date: !String
        }
    ],
    teams: [
        {
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
    ]
}