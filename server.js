const express = require("express");
const colors = require("colors");
const mainRouter = require("./routes/mainRouter");

const connectDB = require("./db");
const User = require("./models/user");

const app = express();
app.use(express.json());

connectDB();
//     .then(() => {
app.get("/users", paginatedResults(User), (req, res) => {
  //   console.log(res);
  res.json(res.paginatedResults);
});
// });
// app.use(mainRouter)

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    if (endIndex < model.countDocuments().exec()) {
      result.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      result.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = result;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

const PORT = process.env.PORT || 5000;

// app.use(mainRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow));
