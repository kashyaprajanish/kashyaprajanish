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
 * router to login admin api
 * -----------------------------------------------------------------------------
 *
 */
// router.post('/login',
//     validators.login,
//     controller.login
// )

/**
 * -----------------------------------------------------------------------------
 * router to create dc for login api
 * -----------------------------------------------------------------------------
 *
 */
 router.post('/create-dc',
    validators.validateDc,
    controller.createDc
)

/**
 * -----------------------------------------------------------------------------
 * router to create dc manager for login api
 * -----------------------------------------------------------------------------
 *
 */
 router.post('/create-admin',
    validators.adminData,
    controller.createAdmin
)

/**
 * -----------------------------------------------------------------------------
 * router to create dc 
 * -----------------------------------------------------------------------------
 *
 */
router.get('/dc-list',
    controller.getDcList
)
/**
 * -----------------------------------------------------------------------------
 * router to login with otp api
 * -----------------------------------------------------------------------------
 *
 */
//  router.post('/update-dc',
//  validators.validateDc,
//  controller.updateDc
// )

/**
 * -----------------------------------------------------------------------------
 * router to login with otp api
 * -----------------------------------------------------------------------------
 *
 */
//  router.post('/update-dc-pin',
//  validators.validateDc,
//  controller.updateDcPin
// )

/**
 * -----------------------------------------------------------------------------
 * router to update dc for login api
 * -----------------------------------------------------------------------------
 *
 */
 router.put('/update-dc/:dcId',
    validators.validateDc,
    controller.updateDc
)
/**
 * -----------------------------------------------------------------------------
 * router to delete dc api
 * -----------------------------------------------------------------------------
 *
 */
 router.delete('/delete-dc/:dcId',
//  validators.validateDc,
 controller.deleteDcAdmin
)
/**
 * -----------------------------------------------------------------------------
 * router to delete dc api
 * -----------------------------------------------------------------------------
 *
 */
 router.get('/get-dc/:dcId',
//  validators.validateDc,
 controller.getDcAdmin
)
/**
 * -----------------------------------------------------------------------------
 * router to activate dc 
 * -----------------------------------------------------------------------------
 *
 */
 router.put('/:dcId/active-status',
    controller.activateDc
)
/**
 * -----------------------------------------------------------------------------
 * router to deactivate dc 
 * -----------------------------------------------------------------------------
 *
 */
 router.put('/:dcId/deactive-status',
    controller.deactivateDc
)

/**
 * -----------------------------------------------------------------------------
 * router to app user list 
 * -----------------------------------------------------------------------------
 *
 */
 router.get('/app-user-list',
    controller.getAppUsers
)

/**
 * -----------------------------------------------------------------------------
 * router to state list 
 * -----------------------------------------------------------------------------
 *
 */
 router.get('/state-list',
    controller.fetchState
)

/**
 * -----------------------------------------------------------------------------
 * router to state list 
 * -----------------------------------------------------------------------------
 *
 */
//  router.post('/add-admin',
//     controller.createAdmin
// )

/**
 * -----------------------------------------------------------------------------
 * router to change password 
 * -----------------------------------------------------------------------------
 *
 */
 router.post('/forgot-password',
    controller.forgotPwd
)

/**
 * -----------------------------------------------------------------------------
 * router to state list 
 * -----------------------------------------------------------------------------
 *
 */
 router.post('/changed-password',
    controller.changePwd
)

/**
 * -----------------------------------------------------------------------------
 * router to activate admin 
 * -----------------------------------------------------------------------------
 *
 */
 router.put('/:userId/active-admin',
    controller.activateAdmin
)
/**
 * -----------------------------------------------------------------------------
 * router to deactivate admin
 * -----------------------------------------------------------------------------
 *
 */
 router.put('/:userId/deactive-admin',
    controller.deactivateAdmin
)

/**
 * -----------------------------------------------------------------------------
 * router to admin user 
 * -----------------------------------------------------------------------------
 *
 */
 router.put('/:userId/deactive-admin',
    controller.getAdminList
)

/**
 * -----------------------------------------------------------------------------
 * router to edit admin for
 * -----------------------------------------------------------------------------
 *
 */
 router.put('/edit-admin/:adminid',
    controller.editAdmin
)

/**
 * -----------------------------------------------------------------------------
 * router to edit admin for
 * -----------------------------------------------------------------------------
 *
 */
 router.get('/list-admin',
    controller.getAdminList
)
module.exports = router;