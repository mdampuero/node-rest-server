const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');

const usersGet = async (req = request, res = response) => {
    const { page = '1', offset = '0', limit = '50' } = req.query;
    const query = { isDelete: false }

    const [total, result] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
    ])
    res.json({
        total,
        result
    })
}

const usersGetOne = async (req, res = response) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        user
    })
}

const usersPost = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(salt);

    await user.save();
    res.json({
        user
    })
}

const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, googleLogin, password, email, ...resto } = req.body;

    if (password) {

    }

    const user = await User.findByIdAndUpdate(id, resto, { new: true });
    res.json({
        user
    })
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    res.json({
        user
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersGetOne
}