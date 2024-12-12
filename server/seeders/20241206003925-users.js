'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: "user1",
        most_listened_song: "The Color Violet",
        most_listened_artist: "Tory Lanez"
      },
      {
        username: "user2",
        most_listened_song: "LIMBO",
        most_listened_artist: "Keshi"
      },
      {
        username: "user3",
        most_listened_song: "ICARUS",
        most_listened_artist: "Tony Ann"
      },
      {
        username: "user4",
        most_listened_song: "dying to see you",
        most_listened_artist: "Bixby"
      },
      {
        username: "kevin_zhang",
        most_listened_song: "DIE FOR ME",
        most_listened_artist: "Chase Atlantic"
      },
      {
        username: "john_doe",
        most_listened_song: "Off Season",
        most_listened_artist: "Austin George"
      },
      {
        username: "john_smith",
        most_listened_song: "run for the hills",
        most_listened_artist: "Tate McRae"
      },
      {
        username: "user5",
        most_listened_song: "Swim",
        most_listened_artist: "Chase Atlantic"
      },
      {
        username: "user6",
        most_listened_song: "Wish I Never Met You",
        most_listened_artist: "Tory Lanez"
      },
      {
        username: "user7",
        most_listened_song: "Swim",
        most_listened_artist: "Chase Atlantic"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
