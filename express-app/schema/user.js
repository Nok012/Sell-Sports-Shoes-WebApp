const mongoose = require("mongoose")
const Schema = require("mongoose").Schema;

const userrSchema = Schema(
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
    User = mongoose.model("users", userrSchema);
}

module.exports = User;