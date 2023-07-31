const { Router } =  require('express');
const { login  } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate');

const router = Router();

router.post('/login', [
    check('email','The name is required').not().isEmpty(),
    check('password','The password is required').not().isEmpty(),
    validateFields
],login);

module.exports = router