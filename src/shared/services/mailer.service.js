const nodemailer = require('nodemailer');
const config = require('../../../config/config');
// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: config.get('EMAIL_SERVICE'),
  auth: {
    user: config.get('FROM_EMAIL'), 
    pass: config.get('EMAIL_APP_PASSWORD') 
  }
});

// Function to send an email
const sendEmail = (to, subject, html) => {
  try {
    // Define email options
    const mailOptions = {
      from: config.get('FROM_EMAIL'), 
      to, 
      subject, // Subject of the email
      html // HTML content of the email
    };
    
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
