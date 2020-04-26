require("dotenv").config();
const { sequelize, User } = require("../models");

const users = require("./users");

try {
  sequelize.sync({ force: true }).then(async () => {
    await Promise.all(users.map((user) => User.create(user)));
  });
} catch (error) {
  console.log(error);
}
