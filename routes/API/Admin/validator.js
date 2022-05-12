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
 * @package     API/Masteradmin/validator
 *
 */

const Joi = require('joi');



/**
 * -----------------------------------------------------------------------------
 * validator for generate user api
 * -----------------------------------------------------------------------------
 *
 */
 module.exports.adminData = async (req, res, next) => {
    try {
      const schema = Joi.object().keys({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        dcId : Joi.string().required(),
        phoneNo: Joi.string().length(10).pattern(/^[0-9]+$/),
        email:Joi.string().email({ tlds: { allow: false } }).required(),
        deviceId:Joi.string(),
        location: Joi.object().keys({
          lat: Joi.number().min(-90).max(90),
          long: Joi.number().min(-180).max(180),
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
 * validator for create dc api
 * -----------------------------------------------------------------------------
 *
 */
 module.exports.validateDc = async (req, res, next) => {
    try {
      const schema = Joi.object().keys({
        dcName: Joi.string().min(3).required(),
        Address: Joi.string().min(10).required(),
        city: Joi.string().min(4).required(),
        state: Joi.string().min(4).required(),
        district: Joi.string().required(),
        pinCode: Joi.string().required(),
        dcContact: Joi.string().min(3).max(15),
        servingPinCodeList:Joi.array().items(Joi.string()),
        location: Joi.object().keys({
          lat: Joi.number().min(-90).max(90),
          long: Joi.number().min(-180).max(180),
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