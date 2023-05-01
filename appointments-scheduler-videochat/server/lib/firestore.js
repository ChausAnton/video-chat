const {db} = require("../firebase/admin")

exports.getEventInfo = async (roomId) => {
    const eventSnapshot = await db
        .collection("events")
        .where('roomId', '==', roomId)
        .get();

    const event = eventSnapshot.docs.map(doc => {
        return {event: doc.data(), eventId: doc.id}
    });

    return  {roomInfo: event[0].event, eventId: event[0].eventId}
  };

exports.updateEvent = async(event, eventId) => {
    const eventSnapshot = await db
    .collection("events")
    .doc(eventId)
    .set(event);
}
  