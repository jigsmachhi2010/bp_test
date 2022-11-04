var multer = require("multer");
var fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "logo" || file.fieldname === "document_files") {
      if (!fs.existsSync(process.env.UPLOAD_DIR)) {
        fs.mkdirSync(process.env.UPLOAD_DIR);
      }
      cb(null, `./${process.env.UPLOAD_DIR}`);
    } else {
      let path = "";
      return path;
    }
  },

  filename: (req, file, cb) => {
    let fileExt = file.originalname.split(".").pop();
    cb(
      null,
      Date.now() + "_" + `${file.fieldname}.${fileExt}`.split(" ").join("_")
    );
  },
});

exports.upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "logo") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(null, false);
      }
    }
    if (file.fieldname === "document_files") {
      // console.log(file, "file");
      if (
        file.mimetype == "application/pdf" ||
        file.mimetype == "application/msword" ||
        file.mimetype ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype == "text/csv"
      ) {
        cb(null, true);
      } else {
        return cb(null, false);
      }
    }
  },
});
