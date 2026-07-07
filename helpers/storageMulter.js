const multer = require("multer");
module.exports = function storageMulter(){
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/uploads/");
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now();
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    });
    return storage;
}