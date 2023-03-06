const multer = require('multer');
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                console.log(file)
                cb(null, __dirname + `/../image/${file.fieldname}/`);
        },
        filename: function (req, file, cb) {
                console.log(file);
                let file_name = "";
                let file_type = "";
                if(file.mimetype.includes('pdf')){
                        file_type = 'pdf';
                        file_name = file.originalname.split('.')[0]+'.';
                }else{
                        file_name = Date.now() + `-${file.fieldname}.`
                        file_type = file.mimetype.split('/')[1];
                }
                cb(null, file_name + file_type)

        }
})
const fileFilter = (req, file, cb) => {
        console.log(file)

        let typeArray = file.mimetype.split('/')
        let filetype = typeArray[1]
        if (filetype == 'jpg' ||
                filetype == 'png' ||
                filetype == 'gif' ||
                filetype == 'jpeg' ||
                filetype == 'bmp' ||
                filetype == 'mp4' ||
                filetype == 'avi' ||
                filetype == 'webp' ||
                filetype == 'ico' ||
                filetype == 'pdf' ||
                filetype == 'haansoftpdf' 
        )
                return cb(null, true)
        req.fileValidationError = "파일 형식이 올바르지 않습니다(.jpg, .png, .gif 만 가능)"
        cb(null, false, new Error("파일 형식이 올바르지 않습니다(.jpg, .png, .gif 만 가능)"))
}
const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limit: {
                fileSize: 100 * 1024 * 1024,
                fieldSize: 100 * 1024 * 1024
        }
});

module.exports = { upload }