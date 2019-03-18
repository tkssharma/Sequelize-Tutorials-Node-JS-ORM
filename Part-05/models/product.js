module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    description: DataTypes.DECIMAL,
  });

  return Products;
}