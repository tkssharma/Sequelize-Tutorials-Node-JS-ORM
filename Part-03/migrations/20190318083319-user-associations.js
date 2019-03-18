'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Contexts', // name of Source model
      'UserId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'User', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      }
    ).then(() => {
      return queryInterface.addColumn(
        'Task', // name of Source model
        'ContextId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Context', // name of Target model
            key: 'id', // key in Target model that we're referencing
          }
        }
      )
    })
  },
  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'Contexts', // name of Source model
      'UserId' // key we want to remove
    ).then(()=>{
        queryInterface.removeColumn(
          'Task', // name of Source model
          'ContextId' // key we want to remove
        )
    })
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
