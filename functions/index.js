const functions = require('firebase-functions');
const app = require('express')();

const {
	getUser,
	getAllUsers,
    createUser,
    startQueue,
    endQueue
} = require('./handlers/users');

// Middlewares
app.use(require('./util/cors'));

// Default Route
app.get('/', (req, res) => {
	res.send(`Kyumee API`);
});

// User Routes
app.get('/users', getAllUsers);
app.post('/users', createUser);
app.get('/users/:userID', getUser);
app.post('/users/:userID/queues', startQueue);
app.delete('/users/:userID/queues', endQueue);

exports.api = functions
    .region('europe-west1').https.onRequest(app);
