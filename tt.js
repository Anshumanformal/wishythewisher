// const current_time_in_utc = new Date().toUTCString();
// const current_time_ist = new Date(current_time_in_utc).toLocaleDateString();
// console.log("cccccccc",current_time_ist);
// let scheduledWishingTime = "48 9 * * *";

const moment = require("moment");

// const current_date_ist = moment('2022-03-09T13:18:09+05:30');
const server_date_utc = moment('2022-03-09T18:26:00+05:30').subtract('5:30', 'hours');
// const moment_date = moment().date().toString();
// const moment_month = moment().month() < 12 ? (moment().month()+1).toString() : "1";

// console.log("moment_date------", moment_date);
// console.log("moment_month-----", moment_month);

// console.log("current_date_ist-----", current_date_ist);
console.log("server_date_utc------", server_date_utc);