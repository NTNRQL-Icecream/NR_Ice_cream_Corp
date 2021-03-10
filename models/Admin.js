const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Admin extends Model {
    passwordCheck(userPassword) {
        return bcrypt.compareSync(userPassword, this.password);
    }
};

Admin.init(
    {
        admin_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    }, {
    hooks: {
        beforeCreate: async (adminData) => {
            adminData.password = await bcrypt.hash(adminData.password, 10);
            return adminData;
        },
        beforeUpdate: async (adminData) => {
            adminData.password = await bcrypt.hash(adminData.password, 10);
            return adminData;
        }
    },
    sequelize,
    modelName: "Admin",
    timestamps: false,
    freezeTableName: true,
    underscored: true
});

module.exports = Admin;