const router = require('express').Router();
const userRoutes = require('./userRoutes');

const comments = require('./commentRoutes')
const blogs = require('./blogRoutes');




router.use('/users', userRoutes);

router.use('/blog',blogs)
router.use('/comment',comments);

module.exports = router;
