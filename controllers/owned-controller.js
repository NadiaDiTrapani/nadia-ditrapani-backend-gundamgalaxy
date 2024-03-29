const knex = require('knex')(require('../knexfile'));

const index = async (req, res) => {
    try {
        // Fetch user-owned gundams
        const userOwned = await knex('owned').where({ user_id: req.params.id });

        // Extract gundam IDs from user-owned gundams
        const gundamIds = userOwned.map((ownedItem) => ownedItem.gundam_id);

        // Fetch gundam details for the extracted IDs
        const gundamDetails = await knex('gundams').whereIn('id', gundamIds);

        // Combine user-owned gundams with their details
        const userOwnedGundams = userOwned.map((ownedItem) => {
            const gundamDetail = gundamDetails.find((gundam) => gundam.id === ownedItem.gundam_id);
            return { ...ownedItem, ...gundamDetail };
        });

        // Send the combined data in the response
        res.status(200).json(userOwnedGundams);
    } catch (err) {
        res.status(400).send(`Can't get user-owned gundams: ${err}`);
    }
};
module.exports = {
    index,
};