const express = require('express');

const SendMailService = require('./../services/sendMail.service');

const service = new SendMailService();
const router = express.Router();

router.post('/sendMail', async (req, res, next) => {
  try {
    const { nombre, email, subject, message } = req.body;
    const rta = await service.sendMessage(nombre, email, subject, message);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
