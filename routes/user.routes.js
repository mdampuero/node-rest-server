const { Router } =  require('express');
const { usersGet, usersPut, usersPost, usersDelete,usersGetOne } = require('../controllers/users.controllers');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate');
const { isRoleValid, isEmailExist, isUserExist } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);

router.get('/:id',[
    check('id','The id is not valid').isMongoId(),
    check('id').custom(isUserExist),
    validateFields
], usersGetOne);

router.put('/:id',[
    check('id','The id is not valid').isMongoId(),
    check('id').custom(isUserExist),
    validateFields
], usersPut);

router.post('/', [
    check('name','The name is required').not().isEmpty(),
    check('email','The email is invalid').isEmail(),
    check('password','The password is required').not().isEmpty(),
    check('role').custom(isRoleValid),
    check('email').custom(isEmailExist),
    validateFields
],usersPost);

router.delete('/:id',[
    check('id','The id is not valid').isMongoId(),
    check('id').custom(isUserExist),
    validateFields
], usersDelete);

module.exports = router