const express = require("express");
const User = require("../models/user");
const app = express();

app.get("/apps", paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults);
});

app.get("/apps/:by", paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const by = req.params.by;
    const order = req.query.order;
    const maxIndex = parseInt(req.query.max);
    const result = {};

    try {
      if (by === "id") {
        const startIndex = parseInt(req.query.start) - 1 || 0;
        const endIndex = parseInt(req.query.end);

        let helperIndex =
          startIndex + maxIndex - 1 > endIndex
            ? endIndex
            : startIndex + maxIndex ;

        let rawDataArray = await model.find({}, { _id: 0 }).exec();
        result.results = rawDataArray.slice(
          startIndex,
          helperIndex || endIndex || startIndex + 50
        );
      } else {
        const startIndex = parseInt(/\d+/.exec(req.query.start)) - 1 || 0;
        const endIndex = parseInt(/\d+/.exec(req.query.end));

        let helperIndex =
          startIndex + maxIndex  > endIndex
            ? endIndex
            : startIndex + maxIndex;

        let rawDataArray = await model.find({}, { _id: 0 }).exec();
        result.results = rawDataArray.slice(
          startIndex,
          helperIndex || endIndex || startIndex + 50
        );
      }

      order === "desc" ? result.results.reverse() : result.results.sort();

      res.paginatedResults = result;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = app;
