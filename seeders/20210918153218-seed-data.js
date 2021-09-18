module.exports = {
  up: async (queryInterface, Sequelize) => {
  // seed data for features table
    const featureList = [
      {
        name: 'Registration',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Login',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Nav-Bar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bug Index',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('features', featureList);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('features', null, {});
  },
};
