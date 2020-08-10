const express = require("express");
const User = require("../models/user");
const app = express();

app.get("/apps", paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const by = req.query.by;
    const startIndex = parseInt(req.query.start) - 1 || 0;
    const endIndex = parseInt(req.query.end);
    const maxIndex = parseInt(req.query.max) + 1;
    const order = req.query.order;

    const result = {};

    try {
      let rawDataArray = await model.find({}, { _id: 0 }).exec();
      result.results = rawDataArray.slice(
        startIndex,
        startIndex + maxIndex - 1 || endIndex || startIndex + 50
      );

      if (by === "name") {
        // console.log("Name", by, order);
        order === "asc" ? result.results.sort() : result.results.reverse();
      } else if (by === "id") {
        // console.log("id", by, order);
        order === "asc"
          ? result.results.sort((a, b) => a.id - b.id) // Not Working Properly
          : result.results.sort((a, b) => b.id - a.id); // Not Working Properly
      }

      res.paginatedResults = result;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = app;
