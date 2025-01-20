import fs from "fs";
import path from "path";
import multer from "multer";
import createHttpError from "http-errors";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(path.join(process.cwd(), "public", "uploads"), {
      recursive: true,
    });

    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const whiteListFormat = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];

    if (whiteListFormat.includes(file.mimetype)) {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now().toString()}${ext}`;

      cb(null, fileName);
    } else {
      cb(new createHttpError.BadRequest("Image format is not valid"));
    }
  },
});

const uploader = multer({ storage, limits: { fileSize: 3 * 1000 * 1000 } });
export default uploader;
