const expressFunction = require("express");
const router = expressFunction.Router();
const bcrypt = require("bcryptjs");
const User = require("../schema/user")

const makeHash = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

const insertUser = (dataUser) => {
  return new Promise((resolve, reject) => {
    var new_user = new User({
      name: dataUser.name,
      email: dataUser.email,
      password: dataUser.password,
      role: dataUser.role,
      gender: dataUser.gender,
      tel: dataUser.tel,
    });

    new_user.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert user to DB!"));
      } else {
        resolve({ message: "Sign up successfully" });
      }
    });
  });
};

router.route("/signup").post((req, res) => {
  makeHash(req.body.password)
    .then((hashText) => {
      const playload = {
        name: req.body.name,
        email: req.body.email,
        password: hashText,
        role: "Customer",
        gender: req.body.gender,
        tel: req.body.tel,
      };
      insertUser(playload)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
