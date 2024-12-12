'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [
      {
        song_name: "Friends",
        track_length: "230",
        total_plays: "747911822",
        artist_id: "1"
      },
      {
        song_name: "Swim",
        track_length: "228",
        total_plays: "791596222",
        artist_id: "1"
      },
      {
        song_name: "DIE FOR ME",
        track_length: "206",
        total_plays: "27795986",
        artist_id: "1"
      },
      {
        song_name: "YOU",
        track_length: "213",
        total_plays: "612477",
        artist_id: "1"
      },
      {
        song_name: "NEW DROP",
        track_length: "217",
        total_plays: "105705636",
        artist_id: "2"
      },
      {
        song_name: "Lemonade",
        track_length: "195",
        total_plays: "1381306698",
        artist_id: "2"
      },
      {
        song_name: "TORE UP",
        track_length: "126",
        total_plays: "114965586",
        artist_id: "2"
      },
      {
        song_name: "Euphoria",
        track_length: "216",
        total_plays: "103799698",
        artist_id: "2"
      },
      {
        song_name: "Soft Spot",
        track_length: "204",
        total_plays: "31243849",
        artist_id: "3"
      },
      {
        song_name: "like i need u",
        track_length: "182",
        total_plays: "217873646",
        artist_id: "3"
      },
      {
        song_name: "Texas",
        track_length: "188",
        total_plays: "8913826",
        artist_id: "3"
      },
      {
        song_name: "LIMBO",
        track_length: "212",
        total_plays: "293893264",
        artist_id: "3"
      },
      {
        song_name: "ICARUS",
        track_length: "199",
        total_plays: "16766585",
        artist_id: "4"
      },
      {
        song_name: "PULSE",
        track_length: "163",
        total_plays: "2387584",
        artist_id: "4"
      },
      {
        song_name: "RAIN",
        track_length: "224",
        total_plays: "7086119",
        artist_id: "4"
      },
      {
        song_name: "SCORPIO \"The Mysterious\"",
        track_length: "194",
        total_plays: "91061",
        artist_id: "4"
      },
      {
        song_name: "The Color Violet",
        track_length: "226",
        total_plays: "953294246",
        artist_id: "5"
      },
      {
        song_name: "I LIKE",
        track_length: "143",
        total_plays: "109953386",
        artist_id: "5"
      },
      {
        song_name: "Broke In A Minute",
        track_length: "132",
        total_plays: "438324601",
        artist_id: "5"
      },
      {
        song_name: "Wish I Never Met You",
        track_length: "224",
        total_plays: "19840931",
        artist_id: "5"
      },
      {
        song_name: "darling, he lied",
        track_length: "157",
        total_plays: "1476308",
        artist_id: "6"
      },
      {
        song_name: "endlessly",
        track_length: "125",
        total_plays: "14146126",
        artist_id: "6"
      },
      {
        song_name: "dying to see you",
        track_length: "141",
        total_plays: "4013768",
        artist_id: "6"
      },
      {
        song_name: "distance",
        track_length: "113",
        total_plays: "4625191",
        artist_id: "6"
      },
      {
        song_name: "APEROL SPRITZ",
        track_length: "130",
        total_plays: "10018258",
        artist_id: "7"
      },
      {
        song_name: "WITHOUT YOU",
        track_length: "161",
        total_plays: "961279317",
        artist_id: "7"
      },
      {
        song_name: "GIRLS",
        track_length: "152",
        total_plays: "112734747",
        artist_id: "7"
      },
      {
        song_name: "BABY I'M BACK",
        track_length: "171",
        total_plays: "93871114",
        artist_id: "7"
      },
      {
        song_name: "greedy",
        track_length: "131",
        total_plays: "1507239782",
        artist_id: "8"
      },
      {
        song_name: "run for the hills",
        track_length: "143",
        total_plays: "185322651",
        artist_id: "8"
      },
      {
        song_name: "exes",
        track_length: "159",
        total_plays: "466992182",
        artist_id: "8"
      },
      {
        song_name: "you broke me first",
        track_length: "170",
        total_plays: "1557180507",
        artist_id: "8"
      },
      {
        song_name: "Tip Toe",
        track_length: "224",
        total_plays: "183495976",
        artist_id: "9"
      },
      {
        song_name: "Dancing with my phone",
        track_length: "203",
        total_plays: "65092139",
        artist_id: "9"
      },
      {
        song_name: "Rockstar",
        track_length: "182",
        total_plays: "7117409",
        artist_id: "9"
      },
      {
        song_name: "My Dear",
        track_length: "159",
        total_plays: "3238415",
        artist_id: "9"
      },
      {
        song_name: "Hands On You",
        track_length: "155",
        total_plays: "34900034",
        artist_id: "10"
      },
      {
        song_name: "Off Season",
        track_length: "190",
        total_plays: "6869223",
        artist_id: "10"
      },
      {
        song_name: "bluebonnets",
        track_length: "126",
        total_plays: "21921324",
        artist_id: "10"
      },
      {
        song_name: "Grey Lines",
        track_length: "168",
        total_plays: "6054023",
        artist_id: "10"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
