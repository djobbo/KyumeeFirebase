const functions = require('firebase-functions');
const app = require('express')();

app.use(require('./util/cors'));

const { getUser, getAllUsers, createUser, addPlayer } = require('./handlers/users');
const { getPlayer, getAllPlayersInBracket } = require('./handlers/players');

// User Routes
app.get('/users/:userID', getUser);
app.get('/users', getAllUsers);
app.post('/users', createUser);
app.post('/users/:userID/addPlayer', addPlayer)

// Player Routes

exports.api = functions.https.onRequest(app);