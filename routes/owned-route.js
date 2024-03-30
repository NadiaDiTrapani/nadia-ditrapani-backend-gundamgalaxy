const router = require('express').Router();
const ownedController = require('../controllers/owned-controller')

router
.route('/:id')
.get(ownedController.index)
.put(ownedController.updateStatus)
.post(ownedController.addToOwned)
.delete(ownedController.remove);


module.exports = router;