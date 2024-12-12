'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      song_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      track_length: {
        type: Sequelize.SMALLINT,
        allowNull:false
      },
      total_plays: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      artist_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};