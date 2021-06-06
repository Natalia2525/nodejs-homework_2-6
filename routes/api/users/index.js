const express = require('express');
const router = express.Router();
const upload = require('../../../helpers/upload');

const {
  validateLogin,
  validateSignup,
  validateStatusSubscription,
} = require('./validation');
const guard = require('../../../helpers/guard');
const ctrl = require('../../../controllers/users');

router.post('/signup', validateSignup, ctrl.signup);
router.post('/login', validateLogin, ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, ctrl.current);
router.patch('/avatars', [guard, upload.single('avatar')], ctrl.avatars);

router.patch('/', guard, validateStatusSubscription, ctrl.subscription);

module.exports = router;
