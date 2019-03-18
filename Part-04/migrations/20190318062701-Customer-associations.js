module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Orders', // name of Source model
      'CustomerId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      }
    ).catch((error) =>{
   console.log(error);
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Orders', // name of Source model
      'CustomerId' // key we want to remove
    );
  }
};