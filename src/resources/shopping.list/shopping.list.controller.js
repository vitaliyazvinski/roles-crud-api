const shoppingListModel = require('./shopping.list.model');

const {
  createOrUpdate,
  getOne,
  getAll,
  deleteById,
} = require('../../middlewares/crud')(shoppingListModel);

module.exports = {
  getOne,
  getAll,
  createOrUpdate,
  deleteById,
};
