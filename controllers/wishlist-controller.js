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

// const findOne = async (req, res) => {
//     try {
//         const userFound = await knex('wishlist').where({id: req.params.id});
        
//         if (userFound.found === 0){
//             return res.status(404).json({
//                 message: `Wishlist with ID ${req.params.id} not found`
//             });
//         }

//         const userData = userFound[0];
//         res.status(200).json(userData);
//     } catch (error) {
//         res.status(500).json({
//             message: `Unable to get Wishlist Data for that user with ID ${req.params.id}`
//         })
//     }

// };


module.exports = {
    index,
    // findOne
}
