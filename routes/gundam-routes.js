const router = require('express').Router();
const gundamController = require('../controllers/gundam-controller')


router
.route('/')
.get(gundamController.index)

router
.route('/:id')
.get(gundamController.findOne)

module.exports = router;