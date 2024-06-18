const express = require('express');
const router = express.Router();
const ownedController = require('../controllers/owned-controller');

router
  .route('/:id')
  .get(ownedController.index)
  .put(ownedController.updateStatus)
  .delete(ownedController.remove);

router.post('/add', ownedController.addToOwned);

module.exports = router;
