const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  const MONGODB_URI =
    "mongodb+srv://PaginationDB:1234Chaba@paginationcluster.iewbd.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
  try {
    mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((res) =>
        console.log(
          `Connected to Mongo! Database name: "${res.connections[0].name}"`.cyan
            .underline
        )
      )
      .catch((err) => console.error("Error connecting to mongo", err));
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
