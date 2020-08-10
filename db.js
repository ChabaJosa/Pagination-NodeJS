const mongoose = require("mongoose");
const colors = require("colors");

// const User = require("./models/user");

const connectDB = async () => {
  const MONGODB_URI =
    "mongodb+srv://PaginationDB:1234Chaba@paginationcluster.iewbd.mongodb.net/AppsDB?retryWrites=true&w=majority";
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


// The following was used to populate the MongoDB Database
    
    // var db = mongoose.connection;
    // db.on("error", console.error.bind(console, "connection error:"));
    // db.once("open", function () {
    //   console.log("Connection Successful!");
    //   // documents array
    //   var newUsers = [];

    //   for (let i = 10; i < 100; i++) {
    //     newUsers.push({ name: `my-app-0${i}`, id: i });
    //   }

    //   User.collection.insert(newUsers, function (err, docs) {
    //     if (err) {
    //       return console.error(err);
    //     } else {
    //       console.log("Multiple documents inserted to Collection");
    //     }
    //   });
    // });