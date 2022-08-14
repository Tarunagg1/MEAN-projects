
const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_HOST, // generated ethereal user
        pass: process.env.EMAIL_SECRET // generated ethereal password
    }
});




module.exports = transporter;

