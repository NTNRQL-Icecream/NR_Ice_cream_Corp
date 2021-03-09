const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Admin extends Model { };

Admin.init(
    {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "Admin",
    timestamps: false,
    freezeTableName: true,
    underscored: true
});

module.exports = Admin;