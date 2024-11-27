const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const filterFile = (req, file, cb) => {
    const allowedFileTypes = /jpg|jpeg|png|mp3/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
        return cb(null, true);
    }

    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and MP3 files are allowed.'));
};

const upload = multer(
    {
        storage: storage,
        fileFilter: filterFile
    }
)

module.exports = upload;