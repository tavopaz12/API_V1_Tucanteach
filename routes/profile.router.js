const express = require('express');
const passport = require('passport');

const TaskService = require('../services/task.service');

const router = express.Router();
const service = new TaskService();

router.get(
  '/my-tasks',

  passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const user = req.user;
      const tasks = await service.findByUser(user.sub);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
