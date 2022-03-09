// const current_time_in_utc = new Date().toUTCString();
// const current_time_ist = new Date(current_time_in_utc).toLocaleDateString();
// console.log("cccccccc",current_time_ist);
// let scheduledWishingTime = "48 9 * * *";

const moment = require("moment");

// const current_date_ist = moment('2022-03-09T18:26:00+05:30').toLocaleString();
const server_date_utc = moment("2022-03-09T18:50:44+05:30").utc();
// const moment_date = moment().date().toString();
// const moment_month = moment().month() < 12 ? (moment().month()+1).toString() : "1";

// console.log("moment_date------", moment_date);
// console.log("moment_month-----", moment_month);

// console.log("current_date_ist-----", current_date_ist);
console.log("server_date_utc------", server_date_utc);