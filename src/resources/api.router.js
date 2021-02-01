const { Router } = require('express');
const shoppingListController = require('./shopping.list/shopping.list.controller');
const shoppingListItemController = require('./shopping.list.item/shopping.list.item.controller');
const {
  ensureAuthenticated,
  ensureOwnerAuthorizated,
} = require('../middlewares/auth');
const router = new Router();

router.all('*', ensureAuthenticated);
router.get('/shopping-list/:id', shoppingListController.getOne);
router.get('/shopping-list', shoppingListController.getAll);
router.post(
  '/shopping-list',
  ensureOwnerAuthorizated,
  shoppingListController.createOrUpdate
);
router.delete(
  '/shopping-list/:id',
  ensureOwnerAuthorizated,
  shoppingListController.deleteById
);

router.get('/shopping-list-item/:id', shoppingListItemController.getOne);
router.get('/shopping-list-item', shoppingListItemController.getAll);
router.post(
  '/shopping-list-item',
  ensureOwnerAuthorizated,
  shoppingListItemController.createOrUpdate
);
router.delete(
  '/shopping-list-item/:id',
  ensureOwnerAuthorizated,
  shoppingListItemController.deleteById
);

module.exports = router;
