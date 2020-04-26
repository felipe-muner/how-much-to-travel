const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const EmailController = require("./EmailController");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async recoverPassword(req, res) {
    try {
      const isUser = await User.findOne({ where: { Email: req.body.Email } });
      if (isUser) {
        console.log(isUser);
        // send e-mail
        EmailController.recoverPassword(req.body.Email);
        res.send({
          isUser: isUser,
          msg: "We sent an e-mail to you. Check it there.",
        });
      } else {
        console.log(isUser);
        //redireciona e exibe msg
        res.status(400).send({
          isUser: isUser,
          msg: "E-mail not found.",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error });
    }
  },
  async register(req, res) {
    try {
      console.log("register2");
      const [user, created] = await User.findOrCreate({
        where: { Email: req.body.Email },
        defaults: req.body,
      });
      console.log(user);
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
        created,
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(403).send({
          error: "The login information is incorrect. there is not user",
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        return res.status(401).send({ auth: false, token: null });

      const userJson = user.toJSON();
      res.send({
        auth: true,
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to log in.",
      });
    }
  },
};
