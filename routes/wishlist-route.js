const router = require('express').Router();
const wishlistController = require('../controllers/wishlist-controller')

router
.route('/:id')
.get(wishlistController.index)

// router
// .route('/:id')
// .get(wishlistController.findOne)

module.exports = router;