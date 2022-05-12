const router = require("express").Router();
const _middlewares = require("../../Middlewares/middleware");

router.use('/auth',
  require('./Auth/router')
)

router.use('/masteradmin',
  require('./Masteradmin/router')
)
router.use('/admin',
  require('./Admin/router')
)

router.use('/user',
  require('./User/router')
)
module.exports = router;