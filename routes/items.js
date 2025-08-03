const express = require('express');
const { connect } = require('../db/mongoClient');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const collection = await connect();
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
