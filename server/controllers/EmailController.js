const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASS_GMAIL,
  },
});

module.exports = {
  recoverPassword(email) {
    const mailOptions = {
      from: "felipe.muner@gmail.com", // sender address
      to: email, // list of receivers
      subject: "System Message - Did you forget your password?", // Subject line
      html: "<button>Click here to change your password</button>", // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
    try {
    } catch (error) {
      console.log(error);
    }
  },
};
