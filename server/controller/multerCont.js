var multer = require('multer')
var hwStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/homework/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
// 作业的upload
var hwUpload = multer({
  storage: hwStorage
});

module.exports = {
  hwUpload: hwUpload
}