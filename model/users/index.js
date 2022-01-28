const Users = require('./schema');
const gravatar = require('gravatar');
const getUser = async () => Users.find();
const getUserById = async id => Users.findById(id);
const getUserByEmail = async email => Users.findOne({ email });
const addUser = async ({ username, email, password, verificationToken }) => {
  const newUser = new Users({ username, email, verificationToken });

  newUser.setPassword(password);
  await newUser.updateOne({ avatarURL: gravatar.url(email) });
  await newUser.save();
  return newUser;
};

const updateToken = async (id, token) => {
  await Users.updateOne({ _id: id }, { token });
};

const verifyUpdToken = async ({ token }) => {
  await Users.findOneAndUpdate({ verificationToken: token }, { verify: true });
};
module.exports = {
  updateToken,
  getUser,
  getUserById,
  addUser,
  getUserByEmail,
  verifyUpdToken,
};
