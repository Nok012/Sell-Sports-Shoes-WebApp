const expressFunction = require("express");
const router = expressFunction.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../schema/user")
const key = "MY_KEY";


const findUser = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find email!!!"));
      } else {
        if (data) {
          resolve({
            id: data._id,
            name: data.name,
            email: data.email,
            password: data.password,
          });
        } else {
          reject(new Error("Cannot find email!!!"));
        }
      }
    });
  });
};

const compareHash = (plainText, hashText) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, hashText, (err, data) => {
      if (err) {
        reject(new Error("Error bcrypt compare"));
      } else {
        resolve({ status: data });
      }
    });
  });
};

router.route("/signin").post(async (req, res) => {
  const playload = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const result = await findUser(playload.email);
    const loginStatus = await compareHash(playload.password, result.password);
    const status = loginStatus.status;
    if (status) {
      const token = jwt.sign(result, key, { expiresIn: 60 * 120 });
      res.status(200).json({ result, token, status });
    } else {
      res.status(200).json({ status });
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
