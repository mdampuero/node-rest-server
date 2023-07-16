const bcryptjs = require('bcryptjs');

const encryptPassword = async (password ) => {
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(salt);
}   