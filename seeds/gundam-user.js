/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const gundamData = require('../seed-data/gundams')
const userData = require('../seed-data/users')
const wishlistData = require('../seed-data/wishlist')
const ownedData = require('../seed-data/owned')

exports.seed = async function(knex) {
  await knex('user').del();
  await knex('gundams').del();
  await knex('wishlist').del();
  await knex('owned').del();
  await knex('user').insert(userData);
  await knex('gundams').insert(gundamData);
  await knex('wishlist').insert(wishlistData)
  await knex('owned').insert(ownedData)
};
