import jsSHA from 'jssha';

const userPassword = '123456';
const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
shaObj.update(userPassword);
const hashedPassword = shaObj.getHash('HEX');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userList = [
      {
        email: 'alina@gmail.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'adam@gmail.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', userList);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
