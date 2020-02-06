const functions = require('firebase-functions');
const app = require('express')();

const discord_bot = require('./discord-bot/bot');

const {
	getAllUsers,
    createUser,
	getUser,
    startQueue,
    endQueue
} = require('./handlers/users');

// Middlewares
app.use(require('./util/cors'));

// Default Route
app.get('/', (req, res) => {
	res.send(`Kyumee API`);
});

exports.getAllUsers = functions.region('europe-west1').https.onCall(getAllUsers);
exports.createUser = functions.region('europe-west1').https.onCall(createUser);
exports.getUser = functions.region('europe-west1').https.onCall(getUser);
exports.startQueue = functions.region('europe-west1').https.onCall(startQueue);
exports.endQueue = functions.region('europe-west1').https.onCall(endQueue);

// API Routes

// User Routes
app.get('/users', async (req, res) => {
    const data = await getAllUsers();
    return res.status(data.status).json(data.json);
});
app.post('/users', async (req, res) => {
    const data = await createUser(req.body);
    return res.status(data.status).json(data.json);
});
app.get('/users/:userID', async (req, res) => {
    const data = await getUser(req.params);
    return res.status(data.status).json(data.json);
});
app.post('/users/:userID/queues', async (req, res) => {
    const data = await startQueue({ ...req.body, ...req.params });
    return res.status(data.status).json(data.json);
});
app.delete('/users/:userID/queues', async (req, res) => {
    const data = await endQueue({ ...req.body, ...req.params });
    return res.status(data.status).json(data.json);
});

exports.api = functions
    .region('europe-west1').https.onRequest(app);