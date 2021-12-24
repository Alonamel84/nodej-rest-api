const errors = require('http-errors');

const {
  getContacts: get,
  getContactsById: getById,
  addContact: add,
  removeContactById: removeById,
  updateContactById: updateById,
} = require('../model/contacts/index');

const getContacts = async (req, res, next) => {
  try {
    console.log('ok');
    res.json(await get());
  } catch (err) {
    next(errors(400, err));
  }
};

const getContactsById = async (req, res, next) => {
  try {
    res.json(await getById(req.params.id));
  } catch (err) {
    next(errors(400, err));
  }
};

const addContact = async (req, res, next) => {
  try {
    res.json(await add(req.body));
  } catch (err) {
    next(errors(400, err));
  }
};

const removeContactById = async (req, res, next) => {
  try {
    await removeById(req.params.id);
    res.send({ status: 'success' });
  } catch (err) {
    next(errors(400, err));
  }
};

const updateContactById = async (req, res, next) => {
  try {
    await updateById(req.params.id, req.body);
    res.json(await getById(req.params.id));
  } catch (err) {
    next(errors(400, err));
  }
};
const updateStatusContact = async (req, res, next) => {
  try {
    await updateById(req.params.id, req.body);
    if (!req.body) return res.status(400).json({ message: 'missing field favorite' });
    else return res.status(200).json(await updateStatusContact(req.params.id, req.body));
  } catch (err) {
    next(errors(404, err));
  }
};
module.exports = {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContact,
};
