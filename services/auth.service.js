const bomm = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw bomm.unauthorized('Correo incorrecto');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw bomm.unauthorized('Contraseña incorrecta');
    }

    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw bomm.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '5min' });
    const link = `http://frontend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: config.userGmail,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`,
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);

      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw bomm.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'Contraseña cambiada' };
    } catch (error) {
      throw bomm.unauthorized();
    }
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

module.exports = AuthService;
