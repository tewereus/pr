const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (data, req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_ID,
          pass: "ouyd xigo qnpc dkdk",
        },
    
        tls: {
          // This configuration allows Node.js to accept self-signed certificates
          rejectUnauthorized: false,
        },
      });
      let info = await transporter.sendMail({
        from: "onprintz <abc.com>",
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.htm,
      });
      console.log(`Message Sent ${info.messageId}`);
    
})

module.exports = sendEmail;