const functions = require('firebase-functions');
const app = require('express')();

app.use(require('./util/cors'));

const { getUser, getAllUsers, createUser } = require('./handlers/users');
const { getPlayer } = require('./handlers/players');

// Default Route
app.get('/', (req, res) => { res.send(`Kyumee API`)} );

// User Routes
app.get('/users/:userID', getUser);
app.get('/users', getAllUsers);
app.post('/users', createUser);
app.put('/users/:userID/social/:socialSlug', updateUserSocial);
app.delete('/users/:userID/social/:socialSlug', deleteUserSocial);

// Bracket Routes
app.get('/brackets/:bracketID/players', getAllPlayersInBracket);
app.post('/brackets/:bracketID/players', addPlayerInBracket);
app.get('/brackets/:bracketID/queues', getAllQueuesInBracket);
app.post('/brackets/:bracketID/queues', addQueueInBracket);
app.get('/brackets/:bracketID/teams', getAllTeamsInBracket);
app.post('/brackets/:bracketID/teams', addTeamInBracket);
app.get('/brackets/:bracketID/matches', getAllMatchesInBracket);
app.post('/brackets/:bracketID/matches', addMatchInBracket);

// Player Routes
app.get('/players/:playerID', getPlayer);
app.patch('/player/:playerID', patchPlayer);

exports.api = functions.https.onRequest(app);
