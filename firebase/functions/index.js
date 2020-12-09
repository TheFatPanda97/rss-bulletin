const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.byeWorld = functions.https.onRequest((request, response) => {
	functions.logger.info("Bye logs!", { structuredData: true });
	response.send("Bye from Firebase!");
});

exports.createDoc = functions.https.onRequest(async (req, res) => {
	const docRef = db.collection('users').doc('alovelace');
    await docRef.set({
    first: 'Serena',
    last: 'Yu',
    born: 1995
    });
    res.send("document created")
});
