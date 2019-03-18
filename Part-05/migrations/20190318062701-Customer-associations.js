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
    )
    .then(() => {
      // Payment hasOne Order
      return queryInterface.addColumn(
        'Orders', // name of Target model
        'PaymentId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Payment', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    }).then(() => {
        // Order hasMany Product
        return queryInterface.addColumn(
          'Products', // name of Target model
          'OrderId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Orders', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Orders', // name of Source model
      'CustomerId' // key we want to remove
    ).then(() => {
      queryInterface.removeColumn(
        'Orders', // name of Source model
        'PaymentId' // key we want to remove
      )
    })
  }
};