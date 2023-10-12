var expressFunction = require("express");
const customer = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const cusSchema = Schema(
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
  Customer = mongoose.model("customer", cusSchema);
}

const findCustomer = () => {
  return new Promise((resolve, reject) => {
    Customer.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot findAll customer!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot findAll customer!!!"));
        }
      }
    });
  });
};

customer.route("/customer").get(auth, async (req, res) => {
  const data = await findCustomer();
  console.log(data);
  res.status(200).json(data);
});

const findCustomerID = (id) => {
  return new Promise((resolve, reject) => {
    Customer.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find customer!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot find customer!!!"));
        }
      }
    });
  });
};

customer.route("/customer/:id").get(auth, async (req, res) => {
  const id = req.params.id;
  const data = await findCustomerID(id);
  console.log(data);
  res.status(200).json(data);
});

const EditCustomer = async (id, d) => {


  return new Promise(async (resolve, reject) => {
    Customer.updateMany({ _id: id }, { $set: d }, (err, data) => {
      if (err) {
        reject(new Error("Cannot update customer!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot update customer!!!"));
        }
      }
    });
  });
};

customer.route("/customer/:id").put(auth, async (req, res) => {
  const id = req.params.id;
  const d = req.body;
  console.log(d, id);
  const data = await EditCustomer(id, d);
  console.log(data);
  res.status(200).json(data);
});

module.exports = customer;
