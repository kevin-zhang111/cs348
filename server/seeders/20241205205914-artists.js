'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Artists', [
      {
        artist_name: "Chase Atlantic",
        genre: "R&B",
        popularity_score: "83"
      },
      {
        artist_name: "Don Toliver",
        genre: "Rap",
        popularity_score: "88"
      },
      {
        artist_name: "keshi",
        genre: "R&B",
        popularity_score: "79"
      },
      {
        artist_name: "Tony Ann",
        genre: "Classical",
        popularity_score: "59"
      },
      {
        artist_name: "Tory Lanez",
        genre: "Rap",
        popularity_score: "82"
      },
      {
        artist_name: "bixby",
        genre: "R&B",
        popularity_score: "48"
      },
      {
        artist_name: "The Kid LAROI",
        genre: "Pop",
        popularity_score: "85"
      },
      {
        artist_name: "Tate McRae",
        genre: "Pop",
        popularity_score: "89"
      },
      {
        artist_name: "HYBS",
        genre: "R&B",
        popularity_score: "68"
      },
      {
        artist_name: "Austin George",
        genre: "Pop",
        popularity_score: "50"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
