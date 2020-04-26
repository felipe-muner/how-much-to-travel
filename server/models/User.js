const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
      },
      DateOfBirth: {
        type: DataTypes.DATE,
      },
      Email: {
        type: DataTypes.STRING,
        unique: true,
      },
      Password: DataTypes.STRING,
      Active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const hashPass = await bcrypt.hash(user.Password, 10);
          user.Password = hashPass;
        },
      },
    }
  );

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.Password);
  };

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.Password;
    return values;
  };

  return User;
};
