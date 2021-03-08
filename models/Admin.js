const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/connection");

class Admin extends Model { };

Admin.init(
    {
        admin_id: {
            type: Datatypes.INTEGER,
            primaryKey: true
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false
        },
        password: {
            type: Datatypes.STRING,
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