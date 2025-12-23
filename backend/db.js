require('dotenv').config();
const mongoose = require("mongoose");

const Mongo_URI = process.env.MONGO_URI;

function connectDB() {
  mongoose
    .connect(Mongo_URI)
    .then(() => {
      console.log("Connected To DB");
    })
    .catch((err) => {
      console.log("ERROR connecting DB ", err);
    });
}

module.exports = {
  connectDB,
};