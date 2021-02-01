const shoppingListItemModel = require('./shopping.list.item.model');

const {
  createOrUpdate,
  getOne,
  getAll,
  deleteById,
} = require('../../middlewares/crud')(shoppingListItemModel);

module.exports = {
  getOne,
  getAll,
  createOrUpdate,
  deleteById,
};
