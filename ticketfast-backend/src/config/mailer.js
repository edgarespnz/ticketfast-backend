const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'edgar.esp.carrion@gmail.com',
      pass: 'rvkilatostmeabyy'
    }
  });

  transporter.verify().then(()=>{
    console.log('Ready to send email')
  })

  module.exports = transporter;