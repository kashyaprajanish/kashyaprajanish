const router = require('express').Router();


router.use('/api', require('./API/router'))


module.exports = router;