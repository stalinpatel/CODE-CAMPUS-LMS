// import multer from "multer";
// import fs from "fs";
// import path from "path";

// const uploadPath = path.join(process.cwd(), "uploads");

// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Make sure this folder exists
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   },
// });

// const upload = multer({ storage });

// export default upload;
import multer from "multer";
import fs from "fs";
import path from "path";

// Determine if we're running locally
const isLocal = process.env.NODE_ENV !== "production";

let storage;

if (isLocal) {
  // Disk storage for local dev
  const uploadPath = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  });
} else {
  // Memory storage for production (Vercel)
  storage = multer.memoryStorage();
}

const upload = multer({ storage });

export default upload;
