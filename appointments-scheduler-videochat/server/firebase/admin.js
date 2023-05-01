const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");


admin.initializeApp({
    apiKey: process.env.API_KEY,
    projectId: process.env.PROJECT_ID,
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {admin, db};
