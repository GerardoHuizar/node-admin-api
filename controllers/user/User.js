const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const User = require("../../models/User");
const validate = require("./validate.js");
const { validationErrorMessages, validForm } = require("../common");

function signUp(req, res) {
  const { name, lastName, email, password, repeatPassword } = req.body;

  validate.password.comparison.push(password, repeatPassword);
  const objectErrorMessages = validationErrorMessages(validate, req.body);

  const isValid = validForm(objectErrorMessages);

  const user = new User();

  if (isValid) {
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    bcrypt.hash(password, null, null, (error, hash) => {
      error ? res.status(500).send({ message: error }) : (user.password = hash);
    });
    user.role = "admin";
    user.active = false;

    user.save((error, userStore) => {
      error
        ? res.status(500).send({ message: `user already exists` })
        : !userStore
        ? res.status(500).send({ message: "can't save this user" })
        : res.status(200).send({ message: "User saved successfull" });
    });
  } else {
    res.status(400).send({ messages: objectErrorMessages });
  }
}

module.exports = {
  signUp,
};
