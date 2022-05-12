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

const userModel = require("../../../models/mongoose/users")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");
const _helper = require("../../../Helpers/helpers");


/**
 * controller to create admin along with password info in admin object
 * @param {object} req
 * @param {object} res
 */
 module.exports.createAdmin = async (req, res) => {
    try {
      let { email } = req.body;
      let findMobileNo = await userModel.findOne({ email:email });
      if(findMobileNo){
        res.status(400).send({
          code: 2,
          status:false,
          message: "mobile already exist please try with a different mobile no.",
          payload: e
        })  
      }
      let encPassword = await _helper.utility.common.encryptPassword(10, req.body.password)
      let instance = new userModel();
      instance.phoneNo = req.body.phoneNo;
      instance.password = encPassword;
      instance.location = req.body.location;
      instance.role = "A"
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
          message: "Admin created sucessfully.",
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