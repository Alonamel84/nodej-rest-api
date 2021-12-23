const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index');
//==========================================//

const fs = require('fs').promises;
const cors = require('cors');
router.use(cors());

async function validatorError(req, res, next) {
  console.log('ok');
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    phone: [Joi.string(), Joi.number()],

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  });

  const { error } = schema.validate(req.body);
  console.log(error);
  if (!error) next();
  else next(error);
}

router.get('/', async (req, res, next) => {
  const data = res.json(await listContacts(req.body));
  // const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
  return res.json(data);
});

router.get('/:contactId', async (req, res, next) => {
  try {
    return res.json(await getContactById(req.params.contactId));
  } catch (err) {
    next(createError(err));
  }
});

router.post('/', validatorError, async (req, res, next) => {
  try {
    return res.json(await addContact(req.body));
  } catch (err) {
    next(err.message);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (!result) throw err;
    res.status(200).json({ message: 'contact deleted' });
  } catch (err) {
    return res.status(404).json({ massage: 'Not found' });
  }
});
router.patch('/:contactId', validatorError, async (req, res, next) => {
  try {
    return res.json(await updateContact({ contactId: req.params.contactId, body: req.body }));
  } catch (err) {
    next(err.message);
  }
});

module.exports = router;
