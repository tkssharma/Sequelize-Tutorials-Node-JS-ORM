module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    status: DataTypes.STRING,
    invoiceNumber: DataTypes.STRING,
  });
  Orders.associate = models => {
    Orders.belongsTo(models.Customers);
    Order.hasMany(models.Products);

  };

  return Orders;
};