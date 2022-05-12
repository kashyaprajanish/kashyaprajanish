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
 * @package     Helper/Utilites/auth
 *
 */
const config = require("config");
const smsConfig = config.get("smsConfig");
const unirest = require("unirest");

module.exports = { sendOtp : async (req, res, OTP, phoneNo) => {
  try {
    return new Promise(async (resolve, reject) => {
      resolve(true)
      // var req = unirest("POST", "https://www.fast2sms.com/dev/bulk");

      // req.headers({
      //   "authorization": smsConfig.api_key
      // });

      // req.form({
      //   "sender_id": smsConfig.sender_id,
      //   "message": `${OTP} is your one time password(OTP) for phone verification`,
      //   "language": "english",
      //   "route": "v3",
      //   "numbers": phoneNo
      // });

      // req.end(function (res) {
      //   if (res.error){
      //     console.log("Send OTP error", res.error)
      //     resolve(false)
      //   }else{
      //     resolve(true)
      //   } //throw new Error(res.error);

      //   console.log(res.body);
      // });
    })
  } catch (e) {
    
  }
},

/**
 * Middleware to verify user info and permessions info in req.user object
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
 signIn : async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
}