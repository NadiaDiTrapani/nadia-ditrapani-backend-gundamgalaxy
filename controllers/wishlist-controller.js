const knex = require('knex')(require('../knexfile'));

const index = async (req, res) => {
    try {
        const userWishlist = await knex('wishlist').where({ user_id: req.params.id });

        const gundamId = userWishlist.map((wishlistItem) => wishlistItem.gundam_id);
        const gundamDets = await knex('gundams').whereIn('id', gundamId);

        res.status(200).json(gundamDets);
    } catch (err) {
        console.error('Error fetching wishlist:', err);
        res.status(400).send(`Can't get wishlist: ${err}`);
    }
};

async function addToWishlist(req, res) {
    try {
        const { gundam_id, user_id } = req.body;

        // Check if the gundam is already in the wishlist
        const existingWishlistEntry = await knex('wishlist')
            .where({ gundam_id, user_id })
            .first();

        if (existingWishlistEntry) {
            return res.status(400).json({ message: 'Gundam already exists in wishlist' });
        }

        // Insert the gundam into the wishlist
        await knex('wishlist').insert({ gundam_id, user_id });

        res.status(201).json({ message: 'Gundam added to wishlist successfully' });
    } catch (error) {
        console.error('Error adding gundam to wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const user_id = req.params.id;  // Get user_id from URL parameters
        const { gundam_id } = req.body; // Get gundam_id from request body
        console.log(`Removing gundam_id: ${gundam_id} for user_id: ${user_id}`);
        
        // Perform deletion operation in the database based on gundam_id and user_id
        const result = await knex('wishlist').where({ gundam_id, user_id }).del();

        if (result) {
            res.status(200).json({ message: 'Item deleted from wishlist successfully' });
        } else {
            res.status(404).json({ message: 'Item not found in wishlist' });
        }
    } catch (error) {
        console.error('Error deleting item from wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


module.exports = {
    index,
    addToWishlist,
    remove
};
