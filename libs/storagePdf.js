const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage/files');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const uploadFiles = multer({ storage });

module.exports = uploadFiles;
