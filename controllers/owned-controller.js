const knex = require('knex')(require('../knexfile'));

const index = async (req, res) =>{
    try{
        const userOwned = await knex('owned').where({user_id: req.params.id});

        const gundamId = userOwned.map((ownedItem)=>{
            return ownedItem.gundam_id
        })
        const gundamDets = await knex ('gundams').whereIn('id', gundamId)

        res.status(200).json(gundamDets);
    } catch(err) {
        res.status(400).send(`Can't get wishlist:${err}`)
    }
}

module.exports = {
    index,
}
