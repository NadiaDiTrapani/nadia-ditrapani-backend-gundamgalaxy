const knex = require('knex')(require('../knexfile'));

const index = async (req, res) => {
    try {
        const userOwned = await knex('owned').where({ user_id: req.params.id });
        const gundamIds = userOwned.map((ownedItem) => ownedItem.gundam_id);
        const gundamDetails = await knex('gundams').whereIn('id', gundamIds);
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
        const { id } = req.params;
        const { isCompleted, isInProgress } = req.body;
        await knex('owned').where({ id }).update({ isCompleted, isInProgress });
        res.status(200).json({ message: 'Gundam status updated successfully' });
    } catch (err) {
        console.error('Error updating Gundam status:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addToOwned = async (req, res) => {
    try {
        const { gundam_id, user_id } = req.body;

        if (!gundam_id || !user_id) {
            return res.status(400).json({ message: 'Gundam ID and User ID are required' });
        }

        const existingBoughtEntry = await knex('owned').where({ gundam_id, user_id }).first();

        if (existingBoughtEntry) {
            return res.status(400).json({ message: 'Gundam already exists in Bought' });
        }

        await knex('owned').insert({ gundam_id, user_id });
        res.status(201).json({ message: 'Gundam added to Bought List successfully' });
    } catch (error) {
        console.error('Error adding gundam to Bought List:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const remove = async (req, res) => {
    try {
        const { gundam_id, user_id } = req.body;
        await knex('owned').where({ gundam_id, user_id }).del();
        res.status(200).json({ message: 'Item deleted from Bought List successfully' });
    } catch (error) {
        console.error('Error deleting item from Bought List:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    index,
    updateStatus,
    addToOwned,
    remove
};
