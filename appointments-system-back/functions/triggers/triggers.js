const functions = require("firebase-functions");

const controller = require("./controller");

const eventCreate = functions.firestore
    .document("events/{eventID}")
    .onCreate((snap, context) => {
      controller.eventCreate(snap, context);
    });

const eventUpdate = functions.firestore
    .document("events/{eventID}")
    .onUpdate((change, context) => {
      controller.eventUpdate(change, context);
    });

const eventDelete = functions.firestore
    .document("events/{eventID}")
    .onDelete((snap, context) => {
      controller.eventDelete(snap, context);
    });


const eventReminder = functions.pubsub.schedule("every 5 minutes")
    .onRun(async (context) => {
      controller.eventRemind(context);
    });

module.exports = {
  eventCreate,
  eventUpdate,
  eventDelete,
  eventReminder,
};
