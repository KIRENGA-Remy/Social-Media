import express, { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import upload from '../middleware/multer';
import fs from 'fs';

const router = express.Router();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

router.post('/upload', upload.single('image'), async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    // Delete the local file after upload to Cloudinary
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: 'Uploaded successfully!',
      data: result
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during upload',
    });
  }
});

export default router;
