const {admin} = require("../firebase/admin")

module.exports.auth = async(idToken) => {
    if(!idToken) {
        return null
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        return decodedToken
    } catch (err) {
        console.log(err)
        return null
    }
}