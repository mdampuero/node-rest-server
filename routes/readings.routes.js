const { Router } =  require('express');
const { readingsGet, readingsPost } = require('../controllers/readings.controllers');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate');

const router = Router();

router.get('/', readingsGet);

router.post('/', [
    check('string','The string is required').not().isEmpty(),
    validateFields
],readingsPost);

module.exports = router