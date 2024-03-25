const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) =>{
    try{
        const data = await knex ('user');
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(`Can't get user:${err}`)
    }
}

const findOne = async (req, res) => {
    try {
        const userFound = await knex('user').where({id: req.params.id});
        
        if (userFound.found === 0){
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found`
            });
        }

        const userData = userFound[0];
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to get User Data for that user with ID ${req.params.id}`
        })
    }

};


module.exports = {
    index,
    findOne
}
