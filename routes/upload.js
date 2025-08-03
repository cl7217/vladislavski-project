const express = require('express');
const multer = require('multer');
const path = require('path');
const { checkItemExists, saveItem } = require('../db/mongoClient');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { itemId, name, description } = req.body;
    if (!itemId) {
      return res.status(400).json({ message: 'itemId is required' });
    }

    const exists = await checkItemExists(itemId);
    if (exists) {
      return res.status(409).json({ message: 'Item already exists' });
    }

    const newItem = {
      itemId,
      name: name || '',
      description: description || '',
      filePath: req.file ? req.file.path : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const insertedId = await saveItem(newItem);
    res.status(201).json({ message: 'Item saved', id: insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
