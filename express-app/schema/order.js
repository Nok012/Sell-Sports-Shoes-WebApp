const mongoose = require("mongoose")
const Schema = require("mongoose").Schema;
const orderSchema = Schema(
    {   
        userId: String,
        menuordering: [],
        sumprice: Number,
        time: Date,
    },
    {
        collection: "orders",
    }
);

let Order;
try {
    Order = mongoose.model("orders");
} catch (error) {
    Order = mongoose.model("orders", orderSchema);
}

module.exports = Order

