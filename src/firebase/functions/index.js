const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.byeWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Bye logs!", {structuredData: true});
    response.send("Bye from Firebase!");
  });
  