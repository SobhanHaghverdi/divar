import multer from "multer";
const uploader = multer({ dest: "uploads/" });

export default uploader;
