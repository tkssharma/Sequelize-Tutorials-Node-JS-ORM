'use strict';
module.exports = function(sequelize, DataTypes) {
  var Context = sequelize.define('Context', {
    //define all columns except the automatically included ones (id, createdAt, updatedAt), and the foreign keys/associations.  We HAVE included id here because we've strayed from the default by making id DataType UUID
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        //define associations
        Context.hasMany(models.Task, {
          foreignKey: 'ContextId',
          onDelete: 'CASCADE'
        });
        Context.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Context;
};
