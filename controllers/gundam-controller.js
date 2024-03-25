const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) =>{
    try{
        const data = await knex ('gundams');
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(`Can't get Gundams:${err}`)
    }
}

const findOne = async (req, res) => {
    try {
        const gundamFound = await knex('gundams').where({id: req.params.id});
        
        if (gundamFound.found === 0){
            return res.status(404).json({
                message: `Gundam with ID ${req.params.id} not found`
            });
        }

        const gundamData = gundamFound[0];
        res.status(200).json(gundamData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to get Gundam Data for gundam with ID ${req.params.id}`
        })
    }

    
};


module.exports = {
    index,
    findOne
}
