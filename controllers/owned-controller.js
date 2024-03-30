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

        res.status(200).json(userOwnedGundams);
    } catch (err) {
        res.status(400).send(`Can't get user-owned gundams: ${err}`);
    }
};

const updateStatus = async (req, res) => {
    try {
        // Extract the updated status and the ID of the Gundam from the request body
        const { id } = req.params;
        const { isCompleted, isInProgress } = req.body;

        // Update the status of the corresponding record in the database
        await knex('owned').where({ id }).update({ isCompleted, isInProgress });

        // Send a success response
        res.status(200).json({ message: 'Gundam status updated successfully' });
    } catch (err) {
        // Handle errors
        console.error('Error updating Gundam status:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

async function addToOwned(req, res) {
    try {
        const { gundam_id, user_id } = req.body;

        // Check if the gundam is already in owned list
        const existingBoughtEntry = await knex('owned')
            .where({ gundam_id, user_id })
            .first();

        if (existingBoughtEntry) {
            return res.status(400).json({ message: 'Gundam already exists in Brought' });
        }

        // Insert the gundam into the owned list
        await knex('owned').insert({ gundam_id, user_id });

        res.status(201).json({ message: 'Gundam added to Bought List successfully' });
    } catch (error) {
        console.error('Error adding gundam to Bought List:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const remove = async (req, res) => {
    try {
        const { gundam_id, user_id } = req.body;
        // Perform deletion operation in the database based on gundam_id and user_id
        await knex('owned').where({ gundam_id, user_id }).del();


        res.status(200).json({ message: 'Item deleted from Bought List successfully' });
    } catch (error) {
        console.error('Error deleting item from Bought List:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    index,
    updateStatus,
    addToOwned,
    remove
}