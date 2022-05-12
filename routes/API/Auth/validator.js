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
 * @package     API/Auth/validator
 *
 */

const Joi = require('joi');

/**
 * -----------------------------------------------------------------------------
 * validator for send otp api
 * -----------------------------------------------------------------------------
 *
 */
module.exports.sendOtp = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      phoneNo: Joi.string().required().pattern(/^[0-9]+$/).length(10),
    })
    schema.validate(req.body);
    next()
  } catch (e) {
    console.log(e)
    return res.status(400).send({
      code: 3,
      message: 'Invalid parameter',
      payload: e
    })
  }
}

/**
 * -----------------------------------------------------------------------------
 * validator for validate otp api
 * -----------------------------------------------------------------------------
 *
 */
module.exports.validateOtp = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      phoneNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
      otp: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
    })
    schema.validate(req.body)
    next()
  } catch (e) {
    return res.status(400).send({
      code: 3,
      message: 'Invalid parameter',
      payload: e
    })
  }
}

/**
 * -----------------------------------------------------------------------------
 * validator for generate user api
 * -----------------------------------------------------------------------------
 *
 */
module.exports.generatePassword = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      phoneNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
      password: Joi.string().min(3).max(15).required(),
      name:Joi.string(),
      // password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
      userImage:Joi.string(),
      deviceId:Joi.string().required(),
      location: Joi.object().keys({
        lat: Joi.number().min(-90).max(90).required(),
        long: Joi.number().min(-180).max(180).required(),
      })
    })
    schema.validate(req.body)
    next()
  } catch (e) {
    console.log(e)
    return res.status(400).send({
      code: 3,
      message: 'Invalid parameter',
      payload: e
    })
  }
}

/**
 * -----------------------------------------------------------------------------
 * validator for login user api
 * -----------------------------------------------------------------------------
 *
 */
module.exports.login = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      phoneNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
      password: Joi.string().min(3).max(15).pattern(/^[0-9]+$/).required(),
      deviceId: Joi.string().required(),
    })
    schema.validate(req.body)
    next()
  } catch (e) {
    return res.status(400).send({
      code: 3,
      message: 'Invalid parameter',
      payload: e
    })
  }
}

/**
 * -----------------------------------------------------------------------------
 * validator for login user with otp api
 * -----------------------------------------------------------------------------
 *
 */
 module.exports.loginOtp = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      phoneNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
      otp: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
      deviceId: Joi.string().required(),
    })
    schema.validate(req.body)
    next()
  } catch (e) {
    return res.status(400).send({
      code: 3,
      message: 'Invalid parameter',
      payload: e
    })
  }
}

/**
 * -----------------------------------------------------------------------------
 * validator for login user api
 * -----------------------------------------------------------------------------
 *
 */
 module.exports.loginEmail = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().min(3).max(15).pattern(/^[0-9]+$/).required(),
    })
    schema.validate(req.body)
    next()
  } catch (e) {
    return res.status(400).send({
      code: 3,
      message: 'Invalid parameter',
      payload: e
    })
  }
}