var expressFunction = require("express");
const addshoe = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const shoeSchema = Schema(
  {
        id: String,
        name: String,
        price: Number,
        type: String,
        size: String,
        category: String,
        quantity: Number,
        detail: String,
        img: String,
  },
  {
    collection: "shoes",
  }
);

let Shoe;
try {
  Shoe = mongoose.model("shoes");
} catch (error) {
  Shoe = mongoose.model("shoes", shoeSchema);
}

const addShoe = (shoeData) => {
  return new Promise((resolve, reject) => {
    var new_shoe = new Shoe(shoeData);
    new_shoe.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Shoe to DB!"));
      } else {
        resolve({ message: "Add Shoe successfully" , data});
      }
    });
  });
};

addshoe.route("/addshoe").post(auth, async (req, res) => {
  console.log("addShoe");
  console.log(req.body);
  addShoe(req.body).then(result => {
    console.log(result);
    res.status(200).json(result);
  }).catch(err => {
    console.log(err);
  })

});

module.exports = addshoe;
