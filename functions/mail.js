// Import required modules
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
admin.initializeApp();

// Configure Nodemailer with your email service details
const mailTransport = nodemailer.createTransport({
  service: 'gmail', // Example using Gmail
  auth: {
    user: 'mack2356@gmail.com',
    pass: '7XTJ8GBVLYWRLBD9',
  },
});

// Cloud Function to send an email when a new document is added to "Dates"
exports.sendEmailOnNewDate = functions.firestore
  .document('Dates/{dateId}')
  .onCreate(async (snap, context) => {
    const newValue = snap.data();

    const mailOptions = {
      from: 'Igor Savchenko <mack2356l@gmail.com>',
      to: 'mack2356@gmail.com',
      subject: 'New Date Added',
      text: `A new date has been added: ${newValue.date}. Details: Name - ${newValue.name}, Email - ${newValue.email}`,
    };

    try {
      await mailTransport.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('There was an error while sending the email:', error);
    }
  });
