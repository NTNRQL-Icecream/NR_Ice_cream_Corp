const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/connection");

class Orders extends Model { };

Orders.init(
    {
        order_id: {
            type: Datatypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        price: {
            type: Datatypes.DECIMAL(10, 2),
            allowNull: false
        },
        customer: {
            type: Datatypes.STRING,
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