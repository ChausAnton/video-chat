const mailerTriggers = require("./triggers/triggers");

exports.eventCreate = mailerTriggers.eventCreate;

exports.eventUpdate = mailerTriggers.eventUpdate;

exports.eventDelete = mailerTriggers.eventDelete;

exports.eventReminder = mailerTriggers.eventReminder;
