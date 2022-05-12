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
 * @package     Helper/Utilites/common
 *
 */

const bcrypt = require('bcrypt');
// const AWS = require("aws-sdk");
const config = require("config");
// const fs = require("fs");
const nodemailer = require('nodemailer');
const emailHost = config.get('emailConfig');



module.exports.encryptPassword = async (saltRounds, plainPassword) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("BCRYPT IS CALLED ---------------------------------------")
      console.log(saltRounds, plainPassword)
      bcrypt.hash(plainPassword, saltRounds)
        .then(function (hash) {
          console.log("hash in util", hash)
          resolve(hash)
        })
        .catch(error => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports.checkPassword = async (plainPassword, hash) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Comparing password  : -------", plainPassword, hash)
      bcrypt.compare(plainPassword, hash).then(function (res) {
        console.log("checking password ", res)
        resolve(res)
      });
    } catch (error) {
      reject(error)
    }
  })
}



var transporter = nodemailer.createTransport({
  service: emailHost.provider,
  auth: {
    user: emailHost.email,
    pass: emailHost.password
  }
});


function sendPasswordMail(req){
  var transporter = nodemailer.createTransport({
    service: emailHost.provider,
    auth: {
      user: emailHost.email,
      pass: emailHost.password
    }
  });
  var mailOptions = {
    from: emailHost.provider,
    to: req.body.email,
    subject: 'Password for you farmx retail admin login',
    text: "123456"
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});
}


