const express = require('express');
const router = express.Router();
//==========================================//
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');
router.use(cors());

const contactsPath = path.join(__dirname, '../dp/contacts.json');
//============================================//
router.get('/', async (req, res, next) => {
  const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
  res.json(data);
  console.log(data);
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
