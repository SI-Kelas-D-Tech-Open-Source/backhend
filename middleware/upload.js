import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder tempat file akan disimpan
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Menambahkan timestamp ke nama file
    }
});

// Filter tipe file
const filterFile = (req, file, cb) => {
    const allowedFileTypes = /jpg|jpeg|png|mp3/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
        return cb(null, true);
    }

    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and MP3 files are allowed.'));
};

// Konfigurasi multer
const upload = multer({
    storage: storage,
    fileFilter: filterFile
});

// Middleware untuk dua file: gambar dan suara
export const uploadFiles = upload.fields([
    { name: "gambar", maxCount: 1 }, // Gambar (hanya 1 file)
    { name: "suara", maxCount: 1 }, // Suara (hanya 1 file)
]);

export default upload;
