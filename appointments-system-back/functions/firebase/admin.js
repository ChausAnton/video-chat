const admin = require("firebase-admin");

admin.initializeApp({
  apiKey: process.env.API_KEY,
});

const db = admin.firestore();

module.exports = {admin, db};
