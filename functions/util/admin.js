const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rankxtest.firebaseio.com'
});

db = admin.firestore();

module.exports = { admin, db };