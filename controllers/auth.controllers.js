const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
    const {  email, password } = req.body;
    try {
        const user = await User.findOne({email, isDelete:false});
        if(!user){
            return res.status(400).json({
                "msg":"User or password is not valid"
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                "msg":"User or password is not valid"
            })
        }

        const token = await generateJWT(user.id);

        return res.json({
            "Login":"ok",
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg": "Error"
        })
    }
    
}

module.exports = {
    login
}