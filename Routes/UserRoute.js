const { urlencoded } = require('body-parser');
const express = require('express');
const user = express.Router();
const userModel = require('../Models/User');
const ppModel = require('../Models/PrivatePrediction');
const jwt = require('jsonwebtoken');
const auth = require('../middleWare/auth');
const bcrypt = require('bcryptjs');
require('dotenv').config()


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
                //encypt here
                const saltRounds = 10;

                bcrypt.hash(userData.password, saltRounds, function (err, hash) {
                    // Store hash in your password DB.
                    userData.password = hash
                    userModel.create(userData).then(value => {
                        res.status(201).json({
                            // message: "Account has create sucessfully",
                            message: "สร้างบัญชีผู้ใช้สำเร็จ",
                            status: res.statusCode
                        })

                    }).catch(error => res.status(404).json({
                        // message: "Some thing went wrong",
                        message: "บางอย่างผิดปกติ",
                        status: res.statusCode
                    }))

                });

            } else {
                res.status(401).json({
                    // message: "username is already taken",
                    message: "มีผู้ใช้นี้อยู่แล้ว",
                    status: res.statusCode
                })
            }

        })

    }

})


//login api     //แก้ภาษาไทย
user.post('/login', (req, res) => {
    const userData = {
        user_name: req.body.user_name,
        password: req.body.password,

    }
    if (userData.user_name == undefined || userData.user_name == '' || userData.password == undefined || userData.password == '') {
        res.status(401).json({
            // message: "Fill all Fields",
            message: "โปรดใส่ข้อมูลให้ครบ",
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
                    // message: "User not register please SignUp",
                    message: "ผู้ใช้ยังไม่สมัคร โปรดสมัคร",
                    status: res.statusCode,
                    token: ""
                })
            } else {
                //if username right but password is correct or not
                const dbUserPassword = value.getDataValue('password') //aom1234 from base
                // bcrypt.compare(userData.password, dbUserPassword, function (err, result) { })
                bcrypt.compare(userData.password, dbUserPassword, function (err, result) {
                    // result == true
                    console.log("PassWord : " + result);

                    if (result) {
                        //if password is correct send json web token
                        const userDetail = {
                            name: value.getDataValue('user_name'),
                            id: value.getDataValue('user_id'),
                            fname: value.getDataValue('first_name'),
                            lname: value.getDataValue('last_name'),
                            role: value.getDataValue('role')
                        }
                        // time out set {expiresIn:"60s"}
                        const token = jwt.sign(userDetail, process.env.secret_key, { expiresIn: "3600s" })  //'1234'
                        res.status(200).json({
                            // message: "Logged is successfully",
                            message: "ล็อคอินสำเร็จ",
                            status: res.statusCode,
                            token
                        })
                    } else {
                        //if password is not match
                        res.status(401).json({
                            // message: "Invalid Crendential Given"    //ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
                            message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"    //ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
                            , status: res.statusCode
                            , token: ''
                        })
                    }
                });



            }

        })

    }

})

//get user profile
user.get('/profile', (req, res) => {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        //Webtoken validate
        const token = authHeader.substr("Bearer".length + 1)
        jwt.verify(token, process.env.secret_key, (err, user) => {
            //if data in token send data
            if (user) {
                res.status(200).json({
                    message: "success"
                    , status: res.statusCode
                    , data: user
                })
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

})




user.get('/get-all-user', auth, (req, res) => {
    userModel.findAll()
        .then((user) => {
            res.status(200).json(user)   // need to hashfunction value password   or  Encyption and Decyption

        })
        .catch((error) => {
            res.status(400).json({
                message: error.message,
                status: res.statusCode
            })
        })
})

user.delete('/delete-user', auth, (req, res) => {
    if (req.body.user_id !== undefined && req.body.user_id !== '') {

        userModel.findOne({
            where: {
                user_id: req.body.user_id
            }
        }).then(data => {
            userModel.destroy({
                where: {
                    user_id: req.body.user_id
                }
            }).then(call => {

                res.status(200).json({
                    // message: "User : " + call + " Delete Success!!"
                    message: "ลบบัญชีผู้ใช้สำเร็จ"
                    , status: res.statusCode
                })

            }).catch(err => {
                res.send('error : ' + err)
            })
        })
    } else {
        res.status(400).json({
            // message: " Can't Delete something wrong "
            message: "ไม่สามารถลบได้มีบางอย่างผิดปกติ"
            , status: res.statusCode
        })
    }
})

user.delete('/delete-ppdata-userdata', auth, (req, res) => {
    if (req.body.user_id !== undefined && req.body.user_id !== '') {

        ppModel.findAll({
            where: {
                user_id: req.body.user_id
            }
        }).then(data => {
            // console.log(data);
            if (data == [] || data == null) {
                //if can't find data in pptable
                userModel.findOne({
                    where: {
                        user_id: req.body.user_id
                    }
                }).then(data => {
                    userModel.destroy({
                        where: {
                            user_id: req.body.user_id
                        }
                    }).then(call => {

                        res.status(200).json({
                            // message: "User : " + call + " Delete Success!!"
                            message: "ลบสำเร็จ"
                            , status: res.statusCode
                        })

                    }).catch(err => {
                        res.send('error : ' + err)
                    })
                })
            } else {
                //if can find
                ppModel.destroy({
                    where: {
                        user_id: req.body.user_id
                    }
                }).then(ppcall => {

                    userModel.findOne({
                        where: {
                            user_id: req.body.user_id
                        }
                    }).then(data => {
                        userModel.destroy({
                            where: {
                                user_id: req.body.user_id
                            }
                        }).then(call => {
                            res.status(200).json({
                                // message: "User : " + call + " and PrivatePrediction Data Delete Success"
                                message: "ลบข้อมูลส่วนตัวและบัญชีผู้ใช้สำเร็จ"
                                , status: res.statusCode
                            })

                        }).catch(err => {
                            res.send('error : ' + err)
                        })
                    })
                }).catch(err => {
                    res.send('error : ' + err)
                })
            }
        })
    } else {
        res.status(400).json({
            // message: " Can't Delete something wrong "
            message: "ไม่สามารถลบได้มีบางอย่างผิดปกติ"
            , status: res.statusCode
        })
    }

})


user.put('/edit-user', auth, (req, res) => {
    const userData = {
        user_name: req.body.user_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role
    }
    if (userData.user_name == undefined || userData.user_name == '' ||
        userData.first_name == undefined || userData.first_name == '' || userData.last_name == undefined || userData.user_name == '' ||
        userData.role == undefined || userData.role == '') {
        res.status(400).json({
            message: "กรุณากรอกข้อมูล",
            status: res.statusCode
        })
    } else {
        userModel.findOne({
            where: {
                user_name: req.body.user_name
            }
        }).then(call => {
            if (call) {
                if (call.dataValues.user_id == req.body.user_id) {
                    userModel.findOne({
                        where: {
                            user_id: req.body.user_id
                        }
                    })
                        .then(data => {
                            if (data) {

                                userModel.update(userData, { where: { user_id: req.body.user_id } })
                                    .then(call => {
                                        res.status(200).json({
                                            message: "แก้ไขข้อมูลสำเร็จ",
                                            status: res.statusCode
                                        })
                                    })
                            } else {
                                res.status(400).json({
                                    // message: "No user Profile for update",
                                    message: "แก้ไขข้อมูลไม่สำเร็จ",
                                    status: res.statusCode
                                })
                            }
                        })
                } else {
                    res.status(400).json({
                        // message: "UserName is already taken",
                        message: "ชื่อผู้ใช้นี้ถูกใช้แล้ว",
                        status: res.statusCode
                    })
                }

            } else {
                userModel.findOne({
                    where: {
                        user_id: req.body.user_id
                    }
                })
                    .then(data => {
                        if (data) {
                            userModel.update(userData, { where: { user_id: req.body.user_id } })
                                .then(call => {
                                    res.status(200).json({
                                        message: "แก้ไขข้อมูลสำเร็จ",
                                        status: res.statusCode
                                    })
                                })
                        } else {
                            res.status(400).json({
                                // message: "No user Profile for update",
                                message: "แก้ไขข้อมูลไม่สำเร็จ",
                                status: res.statusCode
                            })
                        }
                    })
            }
        })
    }
})

user.put('/edit-password', auth, (req, res) => {
    const userData = {
        password: req.body.password,
    }
    userModel.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
        .then(data => {
            if (data) {
                const saltRounds = 10;
                bcrypt.hash(userData.password, saltRounds, function (err, hash) {
                    userData.password = hash;
                    userModel.update(userData, { where: { user_id: req.body.user_id } })
                        .then(call => {
                            res.status(200).json({
                                // message: "Update successful",
                                message: "แก้ไขข้อมูลสำเร็จ",
                                status: res.statusCode
                            })
                        })
                });
            } else {
                res.status(400).json({
                    // message: "No user Profile for update",
                    message: "แก้ไขข้อมูลไม่สำเร็จ",
                    status: res.statusCode
                })
            }
        })

})

user.post('/profile-user', auth, (req, res) => {
    userModel.findOne({
        where: {
            user_id: req.body.user_id
        }
    }).then(data => {
        if (data) {
            res.status(200).json({
                message: "success"
                , status: res.statusCode
                , data: data
            })
        } else {
            res.status(400).json({
                message: "No user Profile"
                , status: res.statusCode
            })
        }
    })
})

//when create api u should use middleWare auth to check userToken when user call api

//checkPassword
user.post('/check-password', (req, res) => {
    const userData = {
        user_id: req.body.user_id,
        password: req.body.password,
    }
    if (userData.user_id == undefined || userData.user_id == '' || userData.password == undefined || userData.password == '') {
        res.status(401).json({
            // message: "Fill all Fields",
            message: "โปรดใส่ข้อมูลให้ครบ",
            status: res.statusCode
        })
    } else {
        //Check username is already registered
        userModel.findOne({
            where: {
                user_id: req.body.user_id
            }
        }).then((value) => {
            if (value === null) {
                //if no data found ask to admin to register
                res.status(401).json({
                    // message: "User not register please SignUp",
                    message: "ผู้ใช้ยังไม่สมัคร โปรดสมัคร",
                    status: res.statusCode,
                    confirmPassword: false
                })
            } else {
                //if username right but password is correct or not
                const dbUserPassword = value.getDataValue('password') //aom1234 from base
                bcrypt.compare(userData.password, dbUserPassword, function (err, result) {
                    console.log("PassWord : " + result);
                    if (result) {
                        res.status(200).json({
                            // message: "Logged is successfully",
                            message: "รหัสผ่านถูกต้อง",
                            status: res.statusCode
                        })
                    } else {
                        //if password is not match
                        res.status(401).json({
                            // message: "Invalid Crendential Given"    //ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
                            message: "รหัสผ่านไม่ถูกต้อง"    //ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
                            , status: res.statusCode
                            
                        })
                    }
                });



            }

        })

    }

})



module.exports = user;