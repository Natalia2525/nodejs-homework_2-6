const express = require('express');
const router = express.Router();

const guard = require('../../../helpers/guard');
const ctrl = require('../../../controllers/contacts');
const {
  validateCreateContact,
  validateUpdateContact,
  validateObjectId,
  validateStatusFavoriteContact,
} = require('./validation');

router.get('/', guard, ctrl.getAll);

router.get('/:contactId', guard, validateObjectId, ctrl.getContactById);

router.post('/', guard, validateCreateContact, ctrl.addContact);

router.delete('/:contactId', guard, validateObjectId, ctrl.removeContact);

router.put(
  '/:contactId',
  guard,
  validateUpdateContact,
  validateObjectId,
  ctrl.updateContact,
);

router.patch(
  '/:contactId/favorite',
  guard,
  validateStatusFavoriteContact,
  validateObjectId,
  ctrl.updateFavorite,
);

module.exports = router;
