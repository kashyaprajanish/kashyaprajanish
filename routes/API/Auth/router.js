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
 * @package     API/Auth/router
 *
 */

const router = require('express').Router();
const controller = require('./controller');
// const _middlewares = require('../../../Middlewares/middleware');
const validators = require('./validator');

/**
 * -----------------------------------------------------------------------------
 * router to send OTP user api
 * -----------------------------------------------------------------------------
 *
 */
router.post('/send-otp',
    validators.sendOtp,
    controller.sendOtp
)

/**
 * -----------------------------------------------------------------------------
 * router to validate OTP user api
 * -----------------------------------------------------------------------------
 *
 */
router.post('/validate-otp',
    validators.validateOtp,
    controller.validateOtp
)

/**
 * -----------------------------------------------------------------------------
 * router to generate user api
 * -----------------------------------------------------------------------------
 *
 */
router.post('/generate-password',
    validators.generatePassword,
    controller.generatePassword
)

/**
 * -----------------------------------------------------------------------------
 * router to login user api
 * -----------------------------------------------------------------------------
 *
 */
router.post('/login',
    validators.login,
    controller.login
)

/**
 * -----------------------------------------------------------------------------
 * router to generate OTP for login api
 * -----------------------------------------------------------------------------
 *
 */
 router.post('/otp-login',
    validators.sendOtp,
    controller.sendOtpLogin
)

/**
 * -----------------------------------------------------------------------------
 * router to login with otp api
 * -----------------------------------------------------------------------------
 *
 */
 router.post('/login-otp',
 validators.loginOtp,
 controller.loginWithOtp
)

/**
 * -----------------------------------------------------------------------------
 * router to login others like admin and super api
 * -----------------------------------------------------------------------------
 *
 */
 router.post('/login-admin',
 validators.loginEmail,
 controller.loginEmail
)

/**
 * -----------------------------------------------------------------------------
 * router to login others like admin and super api
 * -----------------------------------------------------------------------------
 *
 */
 router.delete('/user',
 validators.loginEmail,
 controller.loginEmail
)
module.exports = router;