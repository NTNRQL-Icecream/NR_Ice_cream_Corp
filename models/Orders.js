const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Orders extends Model { };

Orders.init(
    {
        order_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "orders",
    freezeTableName: true,
    underscored: true,
    timestamps: true
});

module.exports = Orders;