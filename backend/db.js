const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://sampi:sampidandin@cluster0.emwtwlt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo successfully");
  });
};

module.exports = connectToMongo;
