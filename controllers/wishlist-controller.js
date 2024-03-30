const knex = require('knex')(require('../knexfile'));

const index = async (req, res) =>{
    try{
        const userWishlist = await knex('wishlist').where({user_id: req.params.id});

        const gundamId = userWishlist.map((wishlistItem)=>{
            return wishlistItem.gundam_id
        })
        const gundamDets = await knex ('gundams').whereIn('id', gundamId)

        res.status(200).json(gundamDets);
    } catch(err) {
        res.status(400).send(`Can't get wishlist:${err}`)
    }
}


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
        res.status(500).json({ message: 'Internal server error' });
    }
}

const remove = async (req, res) => {
    try {
        const { gundam_id, user_id } = req.body;
        // Perform deletion operation in the database based on gundam_id and user_id
        await knex('wishlist').where({ gundam_id, user_id }).del();


        res.status(200).json({ message: 'Item deleted from wishlist successfully' });
    } catch (error) {
        console.error('Error deleting item from wishlist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    index,
    addToWishlist,
    remove
}
