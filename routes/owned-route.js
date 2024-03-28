const router = require('express').Router();
const ownedController = require('../controllers/owned-controller')

router
.route('/:id')
.get(ownedController.index)

module.exports = router;