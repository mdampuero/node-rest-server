const { response, request } = require("express");
const User = require("../models/user");

const usersGet = (req = request, res = response) => {
    const { page = '1', offset = '0', limit = '50' } = req.query;
    res.json({
        msg: 'get API',
        page,
        offset,
        limit
    })
}

const usersPost = async (req, res = response) => {
    const body = req.body;
    const user = new User(body);
    await user.save();
    res.json({
        msg: 'post APIaaaa',
        user
    })
}

const usersPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put API' + id
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}