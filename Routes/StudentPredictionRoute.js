const { urlencoded } = require('body-parser');
const express = require('express');
const studentprediction = express.Router();
const spModel = require('../Models/StudentPrediction');
const jwt = require('jsonwebtoken');
const auth = require('../middleWare/auth');
const bcrypt = require('bcryptjs');
require('dotenv').config()

studentprediction.post('/store', (req, res) => {
    const spData = {
        citizen_id: req.body.citizen_id,
        first_name_th: req.body.first_name_th,
        last_name_th: req.body.last_name_th,
        priority: req.body.priority,
        gpax: req.body.gpax,
        pat1: req.body.pat1,
        pat2: req.body.pat2,
        school_name: req.body.school_name,
        school_province_name: req.body.school_province_name,
        credit_sum: req.body.credit_sum,
        onet01: req.body.onet01,
        onet02: req.body.onet02,
        onet03: req.body.onet03,
        onet04: req.body.onet04,
        onet05: req.body.onet05,
        gat1_current: req.body.gat1_current,
        gat2_current: req.body.gat2_current,
        predic: req.body.predic,
        scoredProbabilities: req.body.scoredProbabilities,
        add_year: req.body.add_year

    }
    if (spData.citizen_id == undefined || spData.citizen_id == '' ||
        spData.first_name_th == undefined || spData.first_name_th == '' ||
        spData.last_name_th == undefined || spData.last_name_th == '' ||
        spData.priority == undefined || spData.priority == '' ||
        spData.gpax == undefined || spData.gpax == '' ||
        spData.pat1 == undefined || spData.pat1 == '' ||
        spData.pat2 == undefined || spData.pat2 == '' ||
        spData.school_name == undefined || spData.school_name == '' ||
        spData.school_province_name == undefined || spData.school_province_name == '' ||
        spData.credit_sum == undefined || spData.credit_sum == '' ||
        spData.onet01 == undefined || spData.onet01 == '' ||
        spData.onet02 == undefined || spData.onet02 == '' ||
        spData.onet03 == undefined || spData.onet03 == '' ||
        spData.onet04 == undefined || spData.onet04 == '' ||
        spData.onet05 == undefined || spData.onet05 == '' ||
        spData.gat1_current == undefined || spData.gat1_current == '' ||
        spData.gat2_current == undefined || spData.gat2_current == '' ||
        spData.predic == undefined || spData.predic == '' ||
        spData.scoredProbabilities == undefined || spData.scoredProbabilities == '' || spData.add_year == undefined || spData.add_year == ''
    ) {
        res.status(401).json({
            message: "Fill all Fields",
            status: res.statusCode
        })
    } else {
        spModel.create(spData).then(value => {

            res.status(200).json({
                message: "Save Prediction sucessfully",
                status: res.statusCode
            })

        }).catch(error => {
            res.status(404).json({
                message: "Some thing went wrong can not save Prediction",
                status: res.statusCode
            })
        }
        )

    }
    // spModel.create(spData)

})

studentprediction.get('/get-all-sp', auth, (req, res) => {
    spModel.findAll({

    }).then((data) => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(400).json({
                message: error.message,
                status: res.statusCode
            })
        }
    }).catch((error) => {
        res.status(400).json({
            message: error.message,
            status: res.statusCode
        })
    })
})

studentprediction.delete('/delete-datasp', auth, (req, res) => {
    if (req.body.sp_id !== undefined && req.body.sp_id !== '') {
        spModel.findOne({
            where: {
                sp_id: req.body.sp_id
            }
        }).then(data => {
            spModel.destroy({
                where: {
                    sp_id: req.body.sp_id
                }
            }).then(call => {
                res.status(200).json({
                    message: "Data : " + call + " Delete Success!!"
                    , status: res.statusCode
                })

            }).catch(err => {
                res.send('error : ' + err)
            })
        })
    } else {
        res.status(400).json({
            message: " Can't Delete something wrong "
            , status: res.statusCode
        })
    }
})

studentprediction.post('/get-year-sp', auth, (req, res) => {
    if (req.body.year !== undefined && req.body.year !== '') {
        spModel.findAll({
            where: {
                add_year: req.body.year
            }
        }).then(data => {
            res.status(200).json(data)
        })
    } else {
        res.status(400).json({
            message: " Can't get data something wrong "
            , status: res.statusCode
        })
    }


})

studentprediction.post('/post-excel-data', auth, (req, res) => {
   

    if (req.body.length) {
        //   res.status(200).json(req.body.length)

        for (let index = 0; index < req.body.length; index++) {
            const data = req.body[index];
                // console.log(data);
                spModel.create(data).then(value => {
                    res.status(200).json({
                        message: "Save Excel data sucessfully",
                        status: res.statusCode
                    })
        
                }).catch(error => {
                    res.status(404).json({
                        message: "Can't post data something wrong",
                        status: res.statusCode
                    })
                }
                )

        }
    } else {
        res.status(400).json({
            message: " Can't post data something wrong "
            , status: res.statusCode
        })
    }








    // if(req.body.year !== undefined && req.body.year !== ''){
    //     spModel.findAll({
    //         where: {
    //             add_year: req.body.year
    //         }
    //     }).then(data => {
    //         res.status(200).json(data)
    //     })
    // }else{
    //     res.status(400).json({
    //         message: " Can't get data something wrong "
    //         , status: res.statusCode
    //     })
    // }


})




module.exports = studentprediction