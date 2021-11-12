const { verify } = require("jsonwebtoken");
const userModel = require('../Models/User');
const jwt = require("jsonwebtoken");
require('dotenv').config()
// module.exports = function auth(req,res ,next){
//     try {
//         const token = req.headers.token ;
//         console.log(token);
//         if(!token){
//             return res.status(400).json({ error: "Unauthorized" });
//         }
//         verify(token,'1234' , async (err, decode) => {
//                 if(err){
//                     return res.status(400).json({ error: "Token Error" });  
//                 }

//                 const user = await userModel.findOne({
//                     where: { user_id: decode.user_id },
//                   });
//                 if(user){
//                     // return  res.status(400).json({ error: "User Invalid" });  
//                     console.log(user);
//                     return next();
//                 }else{
//                     return  res.status(400).json({ error: "User Invalid" });  
//                 }

//         })

//     } catch (error) {
//         return res.status(400).json("Bad request") ;
//     }
// }

module.exports = function auth(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        if (authHeader) {
            //Webtoken validate
            const token = authHeader.substr("Bearer".length + 1)
            jwt.verify(token, process.env.secret_key, async (err, user) => {
                if (err) {
                    return res.status(400).json({ error: "Token Error" });
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
        return res.status(400).json("Bad request");
    }
}