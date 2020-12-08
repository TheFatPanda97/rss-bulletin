const functions = require('firebase-functions');

exports.byeWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Bye logs!", {structuredData: true});
    response.send("Bye from Firebase!");
  });
  