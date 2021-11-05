const { urlencoded } = require('body-parser');
const express = require('express');
const user = express.Router();
const userModel = require('../Models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleWare/auth');
const bcrypt = require('bcryptjs');


//register user v1
user.post('/post-user', (req, res) => {
    const userData = {
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role
    }
    userModel.create(userData)
        .then((user) => {
            res.status(200).json("Create Success");
        })
        .catch((error) => {
            res.send(error);
        })
})

//register api uer v2
user.post('/register', (req, res) => {
    const userData = {
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role
    }
    if (userData.user_name == undefined || userData.user_name == '' || userData.password == undefined || userData.password == '' ||
        userData.first_name == undefined || userData.first_name == '' || userData.last_name == undefined || userData.last_name == '' ||
        userData.role == undefined || userData.role == '') {
        res.status(401).json({
            message: "Fill all Fields",
            status: res.statusCode
        })
    } else {
        //Check username is already registered
        userModel.findOne({
            // attributes:['user_name'] ,
            where: {
                user_name: req.body.user_name
            }
        }).then((value) => {
            if (value === null) {
                //if no data found create new row
                userModel.create(userData).then(value => {
                    res.status(201).json({
                        message: "Account has create sucessfully",
                        status: res.statusCode
                    })

                }).catch(error => res.status(404).json({
                    message: "Some thing went wrong"
                }))
            } else {
                res.status(401).json({
                    message: "username is already taken",
                    status: res.statusCode
                })
            }

        })

    }

})

//get token user login api v1
user.post('/user-login', async (req, res) => {
    try {

        const user = await userModel.findOne({
            where:
            {
                user_name: req.body.user_name,
                password: req.body.password
            }
        })
        if (user == null) {
            //if user null
            return res.status(200).json('Invalid user')
        } else {
            //if not null
            var token = {
                token: jwt.sign(user.dataValues, '1234')
            };
            return res.status(200).json(token)
        }
    } catch (error) {
        return res.json(error)
    }

})

//login api
user.post('/login', (req, res) => {
    const userData = {
        user_name: req.body.user_name,
        password: req.body.password,

    }
    if (userData.user_name == undefined || userData.user_name == '' || userData.password == undefined || userData.password == '') {
        res.status(401).json({
            message: "Fill all Fields",
            status: res.statusCode
        })
    } else {
        //Check username is already registered
        userModel.findOne({
            where: {
                user_name: req.body.user_name
            }
        }).then((value) => {
            if (value === null) {
                //if no data found ask to admin to register
                res.status(401).json({
                    message: "User not register please SignUp",
                    status: res.statusCode,
                    token: ""
                })
            } else {
                //if username right but password is correct or not
                const dbUserPassword = value.getDataValue('password') //aom1234 from base
                console.log(userData.password);
                console.log(dbUserPassword);
                // bcrypt.compare(userData.password, dbUserPassword, function (err, result) { })
                    console.log(userData.password == dbUserPassword);
                    if(userData.password == dbUserPassword) {
                        //if password is correct send json web token
                        const userDetail = {
                            name: value.getDataValue('user_name'),
                            id: value.getDataValue('user_id'),
                            fname: value.getDataValue('first_name'),
                            lname: value.getDataValue('last_name')
                        }
                        // time out set {expiresIn:"60s"}
                        const token = jwt.sign(userDetail,'1234')
                        res.status(200).json({
                            message: "Logged is successfully",
                            status: res.statusCode,
                            token
                        })
                    } else {
                        //if password is not match
                        res.status(401).json({
                            message: "Invalid Crendential Given"
                            , status: res.statusCode
                            , token: ''
                        })
                    }
                
            }

        })

    }

})

//get user profile
user.get('/profile',  (req,res)=>{
    const authHeader = req.headers['authorization']
    if(authHeader){
        //Webtoken validate
        const token = authHeader.substr("Bearer".length+1)
        jwt.verify(token,'1234',(err,user)=>{
            //if data in token send data
            if(user){
                res.status(200).json({
                    message: "success"
                    , status: res.statusCode
                    , data:user
                })
            }else{
                res.status(401).json({
                    message: "Please login"
                    , status: res.statusCode
                    , token: ''
                })
            }
        })

    }else{
        res.status(401).json({
            message: "Please login1"
            , status: res.statusCode
            , token: ''
        })

    }

})


user.get('/get-all-user', auth,(req, res) => {
    userModel.findAll()
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((error) => {
            res.send(error);
        })
})




//when create api u should use middleWare auth to check userToken when user call api
//get data

// user.post('/get-user-data', auth, async (req, res) => {
//     try {
//         const user = await userModel.findOne({
//             where:
//             {
//                 user_id: req.body.user_id
//             }
//         })
//         // var token = jwt.sign(user.dataValues,'1234')
//         return res.status(200).json(user)
//     } catch (error) {
//         return res.json(error)
//     }
// })



module.exports = user;