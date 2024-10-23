import multer from 'multer';
import path from 'path'; 

// Configure storage to maintain the file extension
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    // Get the original extension of the file
    const ext = path.extname(file.originalname);
    
    // Create a unique filename, you can use the original name if needed
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
    // Save file with its extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// Create upload middleware using the storage configuration
const upload = multer({ storage });

export default upload;
