// For the simplicity it's done in the given way
var users = [
  {
    username: 'Adam',
    password: 'secureOwnerPassword',
    role: 'owner',
  },
  {
    username: 'John',
    password: 'secureBuyerPassword',
    role: 'buyer',
  },
];

module.exports = {
  getUser({ username, password }) {
    return users.find(
      user => user.username == username && user.password == password
    );
  },
};
