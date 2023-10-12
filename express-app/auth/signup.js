var expressFunction = require("express");
const signUp = expressFunction.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var Schema = require("mongoose").Schema;

const customerSchema = Schema(
  {
    name: String,
    email: String,
    password: String,
    CusID: String,
    gender: String,
    tel: String,
  },
  {
    collection: "customer",
  }
);

let Customer;
try {
  Customer = mongoose.model("customer");
} catch (error) {
  Customer = mongoose.model("customer", customerSchema);
}

const makeHash = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

const insertCustomer = (dataCustomer) => {
  return new Promise((resolve, reject) => {
    var new_Customer = new Customer({
      name: dataCustomer.name,
      email: dataCustomer.email,
      password: dataCustomer.password,
      CusID: dataCustomer.CusID,
      gender: dataCustomer.gender,
      tel: dataCustomer.tel,
    });

    new_Customer.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert customer to DB!"));
      } else {
        resolve({ message: "Sign up successfully" });
      }
    });
  });
};

signUp.route("/signup").post((req, res) => {
  makeHash(req.body.password)
    .then((hashText) => {
      const playload = {
        name: req.body.name,
        email: req.body.email,
        password: hashText,
        CusID: req.body.CusID,
        gender: req.body.gender,
        tel: req.body.tel,
      };
      console.log(playload);

      insertCustomer(playload)
        .then((result) => {
          console.log(result);
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

module.exports = signUp;
