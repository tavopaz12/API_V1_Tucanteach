const express = require('express');

const ProfileService = require('../services/profile.service');

const router = express.Router();
const service = new ProfileService();

router.get(
  '/:userName',
  async (req, res, next) => {
    try {
      const { userName } = req.params;
      const user = await service.findOne(userName);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
