module.exports = (sequelize, DataTypes) => {
  const CustomerOrder = sequelize.define('Customers', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return CustomerOrder;
};