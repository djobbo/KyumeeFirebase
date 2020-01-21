const functions = require('firebase-functions');
const app = require('express')();

const {
    getUser,
    getAllUsers,
    createUser,
    updateUserSocial,
    deleteUserSocial
} = require('./handlers/users');

const {
    getAllPlayersInBracket,
    getAllQueuesInBracket,
    getAllTeamsInBracket,
    getAllMatchesInBracket,
    addPlayerInBracket,
    addQueueInBracket,
    addTeamInBracket,
    addMatchInBracket
} = require('./handlers/brackets');

const {
    getPlayer,
    updatePlayer
} = require('./handlers/players');

const {
    getQueue,
    updateQueue
} = require('./handlers/queues');

const {
    getTeam,
    updateTeam
} = require('./handlers/teams');

const {
    getMatch,
    updateMatch
} = require('./handlers/matches');

// Middlewares
app.use(require('./util/cors'));

// Default Route
app.get('/', (req, res) => { res.send(`Kyumee API`)} );

// User Routes
app.get('/users/:userID', getUser); // OK
app.get('/users', getAllUsers); // OK
app.post('/users', createUser); // OK
app.put('/users/:userID/socials/:socialSlug', updateUserSocial);
app.delete('/users/:userID/socials/:socialSlug', deleteUserSocial);

// Bracket Routes
app.get('/brackets/:bracket/players', getAllPlayersInBracket); // OK
app.post('/brackets/:bracket/players', addPlayerInBracket); // OK
app.get('/brackets/:bracket/queues', getAllQueuesInBracket);
app.get('/brackets/:bracket/teams', getAllTeamsInBracket);
app.post('/brackets/:bracket/teams', addTeamInBracket);
app.get('/brackets/:bracket/matches', getAllMatchesInBracket);
app.post('/brackets/:bracket/matches', addMatchInBracket);

// Player Routes
app.get('/players/:playerID', getPlayer); // OK
app.put('/player/:playerID', updatePlayer); // OK
app.post('/players/:playerID/queues', startQueue); // OK
app.delete('/players/:playerID/queues', endQueue); // OK

// Queue Routes
app.get('/queues/:queueID', getQueue);
app.put('/queues/:queueID', updateQueue);

// Team Routes
app.get('/team/:teamID', getTeam);
app.put('/team/:teamID', updateTeam);

// Matche Routes
app.get('/matches/:matchID', getMatch);
app.put('/matches/:matchID', updateMatch);

exports.api = functions.https.onRequest(app);
