const { verify } = require("jsonwebtoken");
const userModel = require('../Models/User');
const jwt = require("jsonwebtoken");
require('dotenv').config()


module.exports = function auth(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        // console.log(authHeader);
        if (authHeader) {
            //Webtoken validate
            const token = authHeader.substr("Bearer".length + 1)
            jwt.verify(token, process.env.secret_key, async (err, user) => {
                if (err) {
                    return res.status(400).json({
                        message: "Token Error :"+err
                        , status: res.statusCode
                        , token: ''
                    });
                }
                const findUser = await userModel.findOne({
                    where: { user_id: user.id },
                });
                if (findUser) {
                    return next();
                } else {
                    res.status(401).json({
                        message: "Please login"
                        , status: res.statusCode
                        , token: ''
                    })
                }
            })

        } else {
            res.status(401).json({
                message: "Please login"
                , status: res.statusCode
                , token: ''
            })

        }

    } catch (error) {
        return res.status(400).json({
            message: "Bad request"
            , status: res.statusCode
            , token: ''
        });
    }
}