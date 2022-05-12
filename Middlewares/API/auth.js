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
 * @package     Middlewares/API/auth
 *
 */

const config       = require('config')
const jsonwebtoken = require('jsonwebtoken')
const API_TOKEN    = config.get('api-token')

module.exports = { 
  /**
 * Middleware to verify user info and permessions info in req.user object
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
  verifyToken : async (req, res, next) => {
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
},

/**
 * Middleware to check if user has logged in
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
loginRequired : async(req,res,next) => {
    console.log({"req.user":req.user}, req.body)
    if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
      }
},

/**
 * Middleware to save user info and permessions info in req.user object
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
isAuthorized : async (req,res,next) => {

    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1],'secret',function(err,decode){
            console.log("error",err)
            if(err) req.user = undefined;
            req.user = decode;
            console.log("req.user --- isAuthorised middleware",req.user)
            next();
        })
    }else{
        req.user = undefined
        console.log("req.user --- isAuthorised middleware",req.user)
        next()
    }
},
}



// function isAuthorized(req,res,next){
//     console.log(req.headers);
//     // console.log(req.headers.authorization.split(' ')[0])
//     if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
     
//         jsonwebtoken.verify(req.headers.authorization.split(' ')[1],'secret',function(err,decode){
//             console.log("error",err)
//             if(err) req.user = undefined;
            
//             req.user = decode;
//             console.log("req.user",req.user)
//             next();
//         })
//     }else{
//         req.user = undefined
//         next()
//     }

// }
