const mongoose = require("mongoose")
const Schema = require("mongoose").Schema;
const oderSchema = Schema(
    {
        date: String,
        totalPrice: Number,
        user: {
            // ref _id users schema
            type: Schema.Types.ObjectId,
            ref: 'users'
            // ---------------------
        },
        totalShoe: [{
            // ref _id shoes schema
            shoe: { type: Schema.Types.ObjectId, 
                    ref: 'shoes' },
            // ---------------------
            quantity: Number
        }]
    },
    {
        collection: "oders",
    }
);

let Oder;
try {
    Oder = mongoose.model("oders");
} catch (error) {
    Oder = mongoose.model("oders", oderSchema);
}

module.exports = Oder

