const { urlencoded } = require('body-parser');
const express = require('express');
const privateprediction = express.Router();
const ppModel = require('../Models/PrivatePrediction');
const jwt = require('jsonwebtoken');
const auth = require('../middleWare/auth');
const bcrypt = require('bcryptjs');
require('dotenv').config()

privateprediction.post('/store',auth,(req,res)=>{
    const ppData = {
        citizen_id:req.body.citizen_id,
        first_name_th: req.body.first_name_th,
        last_name_th: req.body.last_name_th,
        priority: req.body.priority,
        gpax: req.body.gpax,
        pat1: req.body.pat1,
        pat2: req.body.pat2,
        school_name: req.body.school_name,
        school_province_name: req.body.school_province_name,
        credit_sum:req.body.credit_sum,
        onet01:req.body.onet01,
        onet02:req.body.onet02,
        onet03:req.body.onet03,
        onet04:req.body.onet04,
        onet05:req.body.onet05,
        gat1_current:req.body.gat1_current,
        gat2_current:req.body.gat2_current,
        predic:req.body.predic,
        scoredProbabilities:req.body.scoredProbabilities,
        user_id:req.body.user_id    //id for 'forren key'
    }
    if(ppData.citizen_id == undefined || ppData.citizen_id == '' || ppData.first_name_th == undefined || ppData.first_name_th == '' ||
    ppData.last_name_th == undefined || ppData.last_name_th == '' || ppData.priority == undefined || ppData.priority == '' || 
    ppData.gpax == undefined || ppData.gpax == '' || ppData.pat1 == undefined || ppData.pat1 == '' || ppData.pat2 == undefined || ppData.pat2 == '' ||
    ppData.school_name == undefined || ppData.school_name == '' || ppData.school_province_name == undefined || ppData.school_province_name == '' ||
    ppData.credit_sum == undefined || ppData.credit_sum == '' || ppData.onet01 == undefined || ppData.onet01 == '' || ppData.onet02 == undefined || ppData.onet02 == '' ||
    ppData.onet03 == undefined || ppData.onet03 == '' || ppData.onet04 == undefined || ppData.onet04 == '' || ppData.onet05 == undefined || ppData.onet05 == '' ||
    ppData.gat1_current == undefined || ppData.gat1_current == '' || ppData.gat2_current == undefined || ppData.gat2_current == '' ||
    ppData.predic == undefined || ppData.predic == '' || ppData.scoredProbabilities == undefined || ppData.scoredProbabilities == '' ||
    ppData.user_id == undefined || ppData.user_id == ''){
        res.status(401).json({
            message: "Fill all Fields",
            status: res.statusCode
        })   
    }else{
        ppModel.create(ppData).then(value => {
            
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
    // ppModel.create(ppData)

})


privateprediction.post('/get-all-pp',auth,(req,res)=>{
    if (req.body.user_id !== undefined && req.body.user_id !== '') {

    
    ppModel.findAll({
        where:{
            user_id:req.body.user_id
        }
    }).then((data)=>{
        if(data){
            res.status(200).json(data)
        }else{
            res.status(400).json({
                message: error.message,
                status: res.statusCode
            })
        }
    })
    .catch((error) => {
        res.status(400).json({
            message: error.message,
            status: res.statusCode
        })
    })
    }else{
        res.status(400).json({
            message: "Fill all fields",
            status: res.statusCode
        })
    }
})

privateprediction.post('/get-all-pp-excel',auth,(req,res)=>{
    if (req.body.user_id !== undefined && req.body.user_id !== '') {

    
    ppModel.findAll({
        attributes: ['citizen_id','first_name_th','last_name_th','priority','gpax','pat1','pat2','school_name','school_province_name','credit_sum','onet01'
        ,'onet02','onet03','onet04','onet05','gat1_current','gat2_current','predic','scoredprobabilities'] ,
        where:{
            user_id:req.body.user_id
        }
    }).then((data)=>{
        if(data){
            console.log(data);
            res.status(200).json(data)
        }else{
            res.status(400).json({
                message: error.message,
                status: res.statusCode
            })
        }
    })
    .catch((error) => {
        res.status(400).json({
            message: error.message,
            status: res.statusCode
        })
    })
    }else{
        res.status(400).json({
            message: "Fill all fields",
            status: res.statusCode
        })
    }
})

privateprediction.delete('/delete-datapp', auth, (req, res) => {
    if (req.body.pp_id !== undefined && req.body.pp_id !== '') {
        ppModel.findOne({
            where: {
                pp_id: req.body.pp_id
            }
        }).then(data => {
            ppModel.destroy({
                where: {
                    pp_id: req.body.pp_id
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



module.exports = privateprediction;