const express = require('express');
const router = express.Router();

const {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContact,
} = require('../../controllers/contacts');

router.get('/:id', getContactsById);
router.patch('/:id', updateContactById);
router.delete('/:id', removeContactById);
router.patch('/:id', updateStatusContact);
router.get('/', getContacts);
router.post('/', addContact);

module.exports = router;
