const { Router } =  require('express');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users.controllers');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', [
    check('name','The name is required').not().isEmpty(),
    check('email','The email is invalid').isEmail(),
    check('password','The password is required').not().isEmpty(),
    check('role','The role is invalid').isIn(['ADMIN_ROLE','USER_ROLE']).not(),
    validateFields
],usersPost);

router.delete('/', usersDelete);

module.exports = router