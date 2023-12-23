const router = require('express').Router();
const thoughtRoute = require('./thoughtRoute');
const userRoute = require('./userRoute');

router.use('/thoughts', thoughtRoute);
router.use('/users', userRoute);

module.exports = router;