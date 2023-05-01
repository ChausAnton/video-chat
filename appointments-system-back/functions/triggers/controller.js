const moment = require("moment");

const {sendEmail} = require("../mailer/mailer");
const messages = require("../common/messages");
const {db} = require("../firebase/admin");

exports.eventCreate = async (snap, context) => {
  return await sendEmail(messages.EVENT_INVITE,
      snap.data().title,
      snap.data().users);
};

exports.eventUpdate = async (change, context) => {
  const after = change.after.data();
  const before = change.before.data();

  if (after.users.length !== before.users.length) {
    if (after.users.length > before.users.length) {
      const newUsers = after.users.filter((beforeUser) => {
        return !before.users.includes(beforeUser);
      });
      await sendEmail(messages.EVENT_INVITE, after.title, newUsers);
    } else if (after.users.length < before.users.length) {
      const deletedUsers = before.users.filter((afterUser) => {
        return !after.users.includes(afterUser);
      });
      await sendEmail(messages.USER_DELETE, after.title, deletedUsers);
    }
  }

  const afterUsers = after.users;

  delete after.users;
  delete before.users;

  if (JSON.stringify(after) === JSON.stringify(before)) {
    return Promise.resolve();
  }

  after.users = afterUsers;

  return await sendEmail(messages.EVENT_UPDATE,
      after.title,
      after.users);
};

exports.eventDelete = async (snap, context) => {
  return await sendEmail(messages.EVENT_CANCEL,
      snap.data().title,
      snap.data().users);
};

exports.eventRemind = async (context) => {
  const start = moment(new Date());
  const end = moment(new Date()).add(10, "minutes");

  const events = await db.collection("events")
      .where("startDate", ">", start)
      .where("startDate", "<", end).get();

  const scheduledMail = events.map(async (event) => {
    sendEmail(messages.EVENT_REMIND, event.data().title, event.data().users);
  });

  await Promise.all(scheduledMail);

  return true;
};
