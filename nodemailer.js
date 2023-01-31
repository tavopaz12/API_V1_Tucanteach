const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
      user: 'tavo.paz12.jopj@gmail.com',
      pass: 'mckgktlluqpfqyuq',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'tavo.paz12.jopj@gmail.com', // sender address
    to: 'tavo.paz12@hotmail.com', // list of receivers
    subject: 'Este es un nuevo correo', // Subject line
    text: 'hola?', // plain text body
    html: '<b>hola?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main();
