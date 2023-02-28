const express = require('express');

const upload = require('./../libs/storage');
const uploadFiles = require('./../libs/storagePdf');
const { config } = require('./../config/config');

const router = express.Router();

router.post('/images', upload.array('images'), (req, res, next) => {
  try {
    const urls = req.files.map((file) => getUrl(req, file));
    res.status(200).json({
      message: 'Archivos subidos',
      urls,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/files', uploadFiles.array('archivo'), (req, res) => {
  try {
    const urls = req.files.map((file) => getUrl(req, file));
    res.status(200).json({
      message: 'Archivos subidos',
      urls,
    });
  } catch (error) {
    next(error);
  }
});

const getUrl = (req, files) => {
  const baseUrl = `${config.hostProd}`;

  if (Array.isArray(files)) {
    return files.map((file) => {
      const filePath = `/public/${file.filename}`;
      return baseUrl + filePath;
    });
  } else if (files) {
    const filePath = `/public/${files.filename}`;
    return [baseUrl + filePath];
  } else {
    return [];
  }
};

module.exports = router;
