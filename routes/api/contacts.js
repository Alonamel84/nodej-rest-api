const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
//==========================================//
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');
router.use(cors());

const contactsPath = path.join(__dirname, '../../dp/contacts.json');
const getData = async () => JSON.parse(await fs.readFile(contactsPath, 'utf-8'));

function getContactById(contactId) {
  const idName = contactId.toString();
  return fs
    .readFile(contactsPath)
    .then(data => {
      const contactById = JSON.parse(data).find(contact => contact.id === idName);
      console.table(contactById);
      return contactById;
    })
    .catch(err => console.log(err.message));
}

// const setData = async data => fs.writeFile(contactsPath, JSON.stringify(data));

//============================================//
router.get('/', async (req, res, next) => {
  const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
  res.json(data);
  console.log(data);
});

router.get('/:contactId', async (req, res, next) => {
  try {
    res.json(await getContactById(req.params.contactId));
  } catch (err) {
    next(createError(err));
  }
});
async function addContact({ name, email, phone }) {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contactList = JSON.parse(data);
  const newContact = { id: uniqid(), name, email, phone };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return newContact;
}
const setContact = async data => fs.writeFile(contactsPath, JSON.stringify(data));
router.post('/', async (req, res, next) => {
  try {
    res.json(await addContact(req.body));
  } catch (err) {
    next(createError(err));
  }
});
function removeContact(contactId) {
  const idName = contactId.toString();
  return fs
    .readFile(contactsPath)
    .then(data => {
      const contactById = JSON.parse(data).filter(contact => contact.id !== idName);
      return contactById;
    })
    .catch(err => err.message);
}

router.delete('/:contactId', async (req, res, next) => {
  try {
    res.json(await removeContact(req.params.contactId));
  } catch (err) {
    next(createError(err));
  }
});

async function updateContact({ contactId, body }) {
  const data = await getData();
  const postIndex = data.findIndex(item => contactId === item.id);
  console.log(postIndex);
  const newContact = { ...data[postIndex], ...body, id: data[postIndex].id };
  data.splice(postIndex, 1, newContact);
  await setContact(data);
  // await fs.writeFile(contactsPath, JSON.stringify(newContact));
  return newContact;
}
router.patch('/:contactId', async (req, res, next) => {
  try {
    res.json(await updateContact({ contactId: req.params.contactId, body: req.body }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
