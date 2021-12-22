const path = require('path');
const uniqid = require('uniqid');
const fs = require('fs/promises');
// const contacts = require('../../dp/contacts.json');
const contactsPath = path.join(__dirname, '../dp/contacts.json');
const setContact = async data => fs.writeFile(contactsPath, JSON.stringify(data));
const listContacts = async () => JSON.parse(await fs.readFile(contactsPath, 'utf-8'));

async function getContactById(contactId) {
  const idName = contactId.toString();
  const data = await fs.readFile(contactsPath);
  const contactById = JSON.parse(data).find(contact => contact.id === idName);
  if (!contactById) throw new Error('Not found');
  return contactById;
}

const removeContact = async contactId => {
  const data = await listContacts();
  const contactById = data.findIndex(item => contactId === item.id);
  if (contactById === -1) return false;
  data.splice(contactById, 1);
  fs.writeFile(contactsPath, JSON.stringify(data));
  return true;
};
async function addContact({ name, email, phone }) {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contactList = JSON.parse(data);
  const newContact = { id: uniqid(), name, email, phone };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return newContact;
}

async function updateContact({ contactId, body }) {
  const data = await listContacts();
  const postIndex = data.findIndex(item => contactId === item.id);
  console.log(postIndex);
  const newContact = { ...data[postIndex], ...body, id: data[postIndex].id };
  data.splice(postIndex, 1, newContact);
  await setContact(data);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
