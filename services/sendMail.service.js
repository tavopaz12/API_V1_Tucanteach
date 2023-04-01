const bomm = require('@hapi/boom');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');

class SendMailService {
  async sendMessage(nombre, email, subject, message) {
    const mail = {
      from: `${nombre} | desde contacto portafolio  <${config.userGmail}>`,
      to: 'tavo.paz12@hotmail.com',
      subject: `${subject}`,
      html: `${message}<br> mi email de contacto es: ${email}
      `,
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoEmail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.userGmail,
        pass: config.passGmail,
      },
    });

    await transporter.sendMail(infoEmail);

    return { message: 'Email enviado' };
  }
}

module.exports = SendMailService;
