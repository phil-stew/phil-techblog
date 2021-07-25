const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const blogs = require('./blogHome')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blog', blogs)

module.exports = router;
