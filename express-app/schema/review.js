const mongoose = require("mongoose")
const Schema = require("mongoose").Schema;

const reviewSchema = Schema(
    {
        rating: Number,
        comment: String,
        img: String,
        datePosted: Date,
        username: String | null,
        shoeName: String
    },
    {
        collection: "reviews",
        versionKey: false // You should be aware of the outcome after set to false
    }
);

let Review;
try {
    Review = mongoose.model("reviews");
} catch (error) {
    Review = mongoose.model("reviews", reviewSchema);
}

module.exports = Review;