/* Copyright (C) 2021 Farmx retail app. All Rights Reserved
 *
 * The file can not be copied and/or distributed without the express
 * permission of copyright owner.
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Farmx PVT LTD., Incorporated and its suppliers if any. The intellectual
 * and technical concepts contained herein are proprietary to Farmx PVT LTD.
 * and its suppliers and may be covered by India. and Local Patents, patents
 * in process, and are protected by trade secret or copyright law. Dissemination
 * of this information or reproduction of this material is strictly forbidden
 * unless prior written permission is obtained from copyright owners
 *
 *
 * @author      Rajanish <rajanish.mishra@efarmexchange.com>
 * @package     API/Auth/controller
 *
 */


const otpModel = require("../../../models/mongoose/otp");
const userModel = require("../../../models/mongoose/users")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");
const _helper = require("../../../Helpers/helpers");


 /**
 * controller to send otp info 
 * @param {object} req
 * @param {object} res
 */
module.exports.sendOtp = async (req, res) => {
  try {
    console.log(_helper)
    let phoneNo = req.body.phoneNo;
    let otp = String(Math.floor(1000 + Math.random() * 8999));
    console.log(otp)
    let otp_res = _helper.utility.auth.sendOtp(req, res, otp, phoneNo);
    if (otp_res) {
      let saveOtp = await otpModel.findOneAndUpdate({ phoneNo: phoneNo }, { "phoneNo": phoneNo, "otpType": "M", "otp": otp }, { upsert: true, new: true }, async function (err, doc) {
        if (err) {
          console.log(err)
          return res.status(400).send({
            code: 3,
            status:false,
            message: "Error occured while creating otp",
            error: err
          });
        } else if (doc) {
          return res.status(200).send({
            code: 1,
            status:true,
            message: "Otp generated sucessfully",
            payload: doc
          })
        }
      }).clone();
    } else {
      return res.status(400).send({
        code: 4,
        message: "Please check your mobile number",
        error: e
      })
    }
  } catch (e) {
    return res.status(500).send({
      code: 4,
      message: "Error occured while creating otp",
      error: e
    })
  }
}

/**
 * controller to validate otp info 
 * @param {object} req
 * @param {object} res
 */
module.exports.validateOtp = async (req, res) => {
  try {
    let { mobileNo, otp } = req.body;
    let findMobileNo = await otpModel.findOne({mobileNo:mobileNo, otpType:"M"});
    if(findMobileNo){
      if(findMobileNo.otp === otp){
        res.status(200).send({
          code: 1,
          status:true,
          message: "otp validated sucessfully",
          payload: {}
        })
      }else{
        res.status(400).send({
          code: 2,
          status:false,
          message: "Please enter a valid otp",
          payload: {}
        })
      }
    }else{
      res.status(400).send({
        code: 2,
        status:false,
        message: "Otp has been expired already. please enter a valid otp",
        payload: {}
      })
    }
  } catch (e) {
    res.status(500).send({
      code: 3,
      message: "Error occured while validating otp"
    })
  }
}

/**
 * controller to create user along with password info in user object
 * @param {object} req
 * @param {object} res
 */
module.exports.generatePassword = async (req, res) => {
  try {
    let { mobileNo } = req.body;
    // userModel.dropIndex({ "phoneNo": 1 })
    let findMobileNo = await otpModel.findOne({ mobileNo:mobileNo });
    // if(findMobileNo){
    //   res.status(400).send({
    //     code: 2,
    //     status:false,
    //     message: "mobile already exist please try with a different mobile no.",
    //     // payload: e
    //   })  
    // }
    let encPassword = await _helper.utility.common.encryptPassword(10, req.body.password)
    let instance = new userModel();
    instance.phoneNo = req.body.phoneNo;
    instance.password = encPassword;
    instance.location = req.body.location;
    instance.deviceId = req.body.deviceId;
    instance.role = "U"
    instance.save((err, data)=>{
      if(err){
        res.status(400).send({
          status:false,
          code: 2,
          message: "Error occured while creating user.",
          payload: err
        })  
      }
      res.status(201).send({
        code: 3,
        status:true,
        message: "User created sucessfully.",
        payload: data
      })  
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      code: 3,
      status:false,
      message: "Error occured while generating password otp",
      payload: e
    })
  }
}

/**
 * controller to signin user and update device id info in user object
 * @param {object} req
 * @param {object} res
 */
module.exports.login = async (req, res) => {
  try {
    let { phoneNo, password, deviceId } = req.body;
    console.log(phoneNo)
    let user = await userModel.findOne({ phoneNo:phoneNo });
    console.log(user)
    if(!user){
      return res.status(400).send({
        code: 2,
        status:true,
        message: "User doesn't exist.",
        // payload: e
      })  
    }
    let isValidPassword = await _helper.utility.common.checkPassword(password, user.password);
    if( !isValidPassword ){
      return res.status(400).send({
        code: 2,
        status:false,
        message: "User id and password mismatched",
        payload: {}
      })
    }
    await userModel.findOneAndUpdate({ phoneNo : phoneNo }, {$set : {deviceId: deviceId}}, (err, data)=>{
      if (err){
        res.status(400).send({
          code: 2,
          status:false,
          message: "Error occured while creating user.",
          payload: err
        })  
      }
      res.status(200).send({
        code: 1,
        status:true,
        message: "User loggedin sucessfully.",
        token: jwt.sign(req.body,config.get('api-token'))
      })
    }).clone()
  } catch (e) {
    console.log(e)
    res.status(500).send({
      code: 3,
      status:false,
      message: "Error occured while generating password otp",
      payload: e
    })
  }
}

/**
 * controller to signin user and update device id info in user object
 * @param {object} req
 * @param {object} res
 */
module.exports.sendOtpLogin = async (req, res) => {
  try {
    let phoneNo = req.body.phoneNo;
    let otp = String(Math.floor(1000 + Math.random() * 8999));
    let userExist = await userModel.findOne({ phoneNo: phoneNo });
    console.log(userExist)
    if (userExist) {
      let otp_res = await _helper.utility.auth.sendOtp(req, res, otp, phoneNo);
      console.log(otp_res)
      if (otp_res) {
        let saveOtp = await otpModel.findOneAndUpdate({ phoneNo: phoneNo }, { "phoneNo": phoneNo, "otpType": "L", "otp": otp }, { upsert: true, new: true }, async function (err, doc) {
          if (err) {
            res.status(400).send({
              code: 3,
              status: false,
              message: "Error occured while creating otp",
              error: err
            });
          } else if (doc) {
            res.status(200).send({
              code: 1,
              status: true,
              message: "Otp generated sucessfully",
              payload: doc
            })
          }
        }).clone();
      } else {
        res.status(400).send({
          code: 3,
          status: false,
          message: "Please check your mobile number",
          error: e
        })
      }
    } else {
      res.status(400).send({
        code: 3,
        status: false,
        message: "User doesn't exist",
        payload: {}
      })
    }
  } catch (e) {
    res.status(500).send({
      code: 4,
      status: false,
      message: "Error occured while creating otp",
      error: e
    })
  }
}

/**
 * controller to signin user and update device id info in user object
 * @param {object} req
 * @param {object} res
 */
module.exports.loginWithOtp = async (req, res) => {
  try {
    let { mobileNo, otp, deviceId } = req.body;
    let user = await userModel.findOne({ mobileNo: mobileNo });
    if (!user) {
      return res.status(400).send({
        code: 2,
        status: true,
        message: "User doesn't exist.",
        payload: e
      })
    }
    let findOtpObj = await otpModel.findOne({ mobileNo: mobileNo, otpType: "L" });
      if (!findOtpObj) {
        return res.status(400).send({
          code: 2,
          status: false,
          message: "otp does not exist please generate otp again",
          payload: {}
        })
      }

      if (findOtpObj.otp === otp) {
        await userModel.findOneAndUpdate({ mobileNo: mobileNo }, { $set: { deviceId: deviceId } }, (err, data) => {
          if (err) {
            res.status(400).send({
              code: 2,
              status: false,
              message: "Error occured while creating user.",
              payload: err
            })
          }
          res.status(200).send({
            code: 1,
            status: true,
            message: "User loggedin sucessfully.",
            token: jwt.sign(req.body, config.get('api-token'))
          })
        }).clone();
      } else {
        res.status(400).send({
          code: 2,
          status: false,
          message: "Error occured while creating user.",
          payload: err
        })
      }
    } catch (e) {
      console.log(e)
      res.status(500).send({
        code: 3,
        status: false,
        message: "Error occured while generating password otp",
        payload: e
      })
    }
  }

  /**
 * controller to signin admins and super admins update device id info in user object
 * @param {object} req
 * @param {object} res
 */
module.exports.loginEmail = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email:email });
    if(!user){
      return res.status(400).send({
        code: 2,
        status:true,
        message: "User doesn't exist.",
        payload: e
      })  
    }
    let isValidPassword = await _helper.utility.common.checkPassword(password, user.password);
    if( !isValidPassword ){
      return res.status(400).send({
        code: 2,
        status:false,
        message: "User id and password mismatched",
        payload: {}
      })
    }
      res.status(200).send({
        code: 1,
        status:true,
        message: "loggedin sucessfully.",
        token: jwt.sign(req.body,config.get('api-token'))
      })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      code: 3,
      status:false,
      message: "Error occured while generating password otp",
      payload: e
    })
  }
}


/**
 * controller to signin admins and super admins update device id info in user object
 * @param {object} req
 * @param {object} res
 */
 module.exports.deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await userModel.findOne({ _id:mongoose.Types.ObjectId(id) });
    if(!user){
      return res.status(400).send({
        code: 2,
        status:true,
        message: "User doesn't exist.",
        payload: e
      })  
    }
    let deletedUser = userModel.find({ _id:mongoose.Types.ObjectId(id) }).remove().exec();
    if(deletedUser){
      res.status(200).send({
        code: 1,
        status:true,
        message: "loggedin sucessfully.",
        token: jwt.sign(req.body,config.get('api-token'))
      })
    }else{
      return res.status(400).send({
        code: 2,
        status:true,
        message: "Error occured while deleting user",
        payload: e
      })  
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({
      code: 3,
      status:false,
      message: "Error occured while deleting user",
      payload: e
    })
  }
}