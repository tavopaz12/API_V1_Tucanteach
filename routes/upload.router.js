const express = require('express');

const upload = require('./../libs/storage');
const uploadFiles = require('./../libs/storagePdf');
const { config } = require('./../config/config');

const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/files', (req, res) => {
  try {
    const directoryPath = path.join(__dirname, '..', 'storage', 'files');

    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log('Error al listar archivos: ' + err);
      }

      res.send(files);
    });
  } catch (error) {
    next(error);
  }
});

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

router.delete('/delete/image/:fileName', async (req, res, next) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join('storage', 'imgs', fileName);

    const result = deleteFile(fileName, filePath);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/delete/file/:fileName', async (req, res, next) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join('storage', 'files', fileName);

    const result = deleteFile(fileName, filePath);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

const deleteFile = (fileName, filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return `El archivo ${fileName} ha sido eliminado`;
  } else {
    return `El archivo ${fileName} no existe`;
  }
};

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
