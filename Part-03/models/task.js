'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    //define all columns except the automatically included ones (id, createdAt, updatedAt), and the foreign keys/associations.  We HAVE included id here because we've strayed from the default by making id DataType UUID
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "Your to-do item name must be between 3 and 50 characters.  Please try again."
        }
      }
    },
    done: DataTypes.BOOLEAN,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      //define associations
      associate: function(models) {
        Task.belongsTo(models.Context, {
          foreignKey: 'ContextId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Task;
};
