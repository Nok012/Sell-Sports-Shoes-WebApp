const mongoose = require("mongoose")
const Schema = require("mongoose").Schema;

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
        img: String
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

module.exports = Shoe;