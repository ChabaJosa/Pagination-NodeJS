const express = require("express");
const app = express();

const users = [
  { id: 1, name: "User 1" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
];

app.get("/users", paginatedResults(users), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return (req, res, next) => { // All middleware functions have these 3 args
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit); // Page Limit

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    if (endIndex < model.length) {
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

    result.results = model.slice(startIndex, endIndex);

    res.paginatedResults = result

    next() // Triggers what comes after the middleware
  };
}

app.listen(3000);
