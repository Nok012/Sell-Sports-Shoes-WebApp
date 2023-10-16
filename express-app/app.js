const expressFunction = require("express");
const mongoose = require("mongoose");
const expressApp = expressFunction();
const setup = require('./config/setup')


const url = "mongodb://127.0.0.1:27017/highstep";
const config = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};





expressApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  return next();
});

// expressApp.use(expressFunction.json());
expressApp.use(expressFunction.json({limit: '50mb'}));
expressApp.use(expressFunction.urlencoded({limit: '50mb', extended: true}));
expressApp.use((req, res, next) => {
  mongoose
    .connect(url, config)
    .then(() => {
      console.log("Connected to MongoDB...");
      next();
    })
    .catch((err) => {
      console.log("Cannot connect to MongoDB");
      res.status(501).send("Cannot connect to MongoDB");
    });
});

expressApp.use("/login", require("./api/signup"));
expressApp.use("/login", require("./api/signin"));
expressApp.use("/user", require("./api/user"));
expressApp.use("/shoe", require("./api/shoe"));
expressApp.use("/order", require("./api/oder"));
expressApp.use("/review", require("./api/review"));

expressApp.listen(3000, async function () {

  // await setup(url, config)
  console.log("Listening on port 3000");
});