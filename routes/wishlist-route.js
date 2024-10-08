const router = require('express').Router();
const wishlistController = require('../controllers/wishlist-controller')

router
.route('/:id')
.get(wishlistController.index)
.post(wishlistController.addToWishlist)
.delete(wishlistController.remove);


module.exports = router;