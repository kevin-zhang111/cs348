'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
      },
      most_listened_song: {
        type: Sequelize.STRING,
        allowNull:false
      },
      most_listened_artist: {
        type: Sequelize.STRING,
        allowNull:false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};