require("dotenv").config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cron = require("node-cron");
const moment = require("moment");
const app = express();
const port = process.env.PORT || 3000;

app.set('views',path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use("/", (req,res,next)=>{
    res.render('index.ejs',{
        title: 'Event wishing app'
    });
})

// Add your data in the given format below.

let wishInfo = [
    {
        info: "Birthday wish Anshu from deployment",
        date: "9",
        month: "3",
        to: "anshumanranjan1998@gmail.com,anshumanformal@gmail.com",
        subject: "Happy birthday wish from Anshu deployment check",
        text: "deployment check Wishing you a very happy birthday Anshu!! Stay blessed and enjoy your day ❤"
    },
    {
        info: "Birthday wish Anshu",
        date: "15",
        month: "4",
        to: "anshumanranjan1998@gmail.com,anshumanformal@gmail.com",
        subject: "Happy birthday wish from Anshu",
        text: "Wishing you a very happy birthday Anshu!! Stay blessed and enjoy your day ❤"
    },
    {
        info: "Birthday wish Shubho",
        date: "26",
        month: "11",
        to: "aayushmanranjan24@gmail.com, aayushmanranjan26@gmail.com",
        subject: "Happy birthday wish from Anshu",
        text: "Wishing you a very happy birthday Shubho!! Stay safe, blessed and enjoy your day ❤"
    },
    {
        info: "Birthday wish Mummy",
        date: "16",
        month: "5",
        to: "meraghar1998@gmail.com",
        subject: "Happy birthday wish from Anshu",
        text: "Wishing you a very happy birthday Mummy!! Stay blessed and enjoy your day ❤"
    },
    {
        info: "Birthday wish Papa",
        date: "31",
        month: "1",
        to: "meraghar1998@gmail.com",
        subject: "Happy birthday wish from Anshu",
        text: "Wishing you a very happy birthday Papa!! Stay blessed and enjoy your day ❤"
    },
    {
        info: "Marriage Anniversary Papa and Mummy",
        date: "16",
        month: "2",
        to: "meraghar1998@gmail.com",
        subject: "Happy marriage anniversary from Anshu",
        text: "Wishing you a very happy marriage anniversary Papa!! Stay blessed and enjoy your day ❤"
    },
    {
        info: "Shubho's academic year completion",
        date: "31",
        month: "7",
        to: "aayushmanranjan24@gmail.com,meraghar1998@gmail.com",
        subject: "Congratulations Shubho on your academic year completion",
        text: "Many many congratulations Shubho on Kudos on successful completion of your academic year. My best wishes for your upcoming ventures and activities you wish to perform. I urge you to stay safe and reach heights in your career and life!! Stay blessed and enjoy your day ❤"
    },
    
]

let commonBirthdayHTMLTemplate; // use this to create a template and add this to the below sendMail function in html attribute.


let scheduledWishingTime = "25 13 * * *";
// let scheduledWishingTime = "01 00 * * *";
// let scheduleEveryTenSecond = "*/10 * * * * *"; 
// let scheduleDaily = "0-1 0 * * * *"; // run this daily between 12:00 am to 12:01 am
//1. Approach 1 - Run the cron job at specific time to send email. (recommended)
//2. Approach 2 - Run the cron job for an interval(say daily between 12:00 am to 12:01 am) and specify the wishing time within the period.
// const wishing_time = "12:00:10 am";


const dateChecker = () => {

    let transporterArray = [];
    const current_date = moment().date().toString();
    const current_month = moment().month() < 12 ? (moment().month()+1).toString() : "1";
    const current_time = moment().subtract('5:30', 'hours');
    // const current_time = new Date().toLocaleTimeString();

    for(let i=0; i<wishInfo.length; i++){
        let transporterObj = {};
        if(current_date === wishInfo[i].date && current_month === wishInfo[i].month /*&& current_time === wishing_time*/){

            transporterObj.to = wishInfo[i].to;
            transporterObj.subject = wishInfo[i].subject || `Best wishes for your great day ❤`;
            transporterObj.text = wishInfo[i].text || `Best wishes for your great day ❤`;
            transporterArray.push(transporterObj);

        }else continue;
    }
    return transporterArray;
}

const sendMail = async (transporterObj) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Anshuman Ranjan 😊" bestwishesfromanshu@gmail.com', // sender address
        to: transporterObj.to, // list of receivers (receivers can be mentioned by separating with a comma)
        subject: transporterObj.subject, // Subject line
        text: transporterObj.text, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });
}

cron.schedule(scheduledWishingTime, () => {

    const transporterArray = dateChecker();
    console.log("transporter-----", transporterArray);
    for(let i=0; i<transporterArray.length; i++){
        let senderObj = transporterArray[i];
        if(Object.keys(senderObj).length != 0){
            sendMail(senderObj)
            .then((data) => {
                console.log("Mail(s) sent successfully");
            })
            .catch((error) => {
                console.log("Error sending mail: ", error);
            })
        }
    }
    return;
    
});

app.listen(port, (err) => {
if (err) console.log(`Error: `, err);
  else console.log(`Server listening on port: `, port);
});