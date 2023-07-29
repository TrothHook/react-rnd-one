'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_user_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
        // unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hashedRefreshToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'tbl_role_masters' }, key: 'id' },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
      },
      temp_password: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        Comment: '1 = new_password, 0 = password_changed',
      },
      password_updated_datetime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: { tableName: 'tbl_user_masters' }, key: 'id' },
      },
      update_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: { tableName: 'tbl_user_masters' }, key: 'id' },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_user_masters');
  },
};
