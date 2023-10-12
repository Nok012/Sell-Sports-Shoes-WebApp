const mongoose = require("mongoose")
const Schema = require("mongoose").Schema;

const userSchema = Schema(
    {
        name: String,
        email: String,
        password: String,
        Role: String,
        gender: String,
        tel: String
    },
    {
        collection: "users",
    }
);

let User;
try {
    User = mongoose.model("users");
} catch (error) {
    User = mongoose.model("users", userSchema);
}

module.exports = User;