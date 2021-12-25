const Contacts = require('./schema');

const getContacts = async () => Contacts.find();
const getContactsById = async id => Contacts.findById(id);
const addContact = async data => Contacts.create(data);
const updateContactById = async (id, data) => Contacts.updateOne({ _id: id }, data);
const removeContactById = async id => Contacts.deleteOne({ _id: id });
const updateStatusContact = async (id, body) => Contacts.updateOne({ _id: id }, body);
module.exports = {
  getContacts,
  getContactsById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContact,
};
