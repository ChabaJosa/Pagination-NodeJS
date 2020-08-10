const express = require("express");
const colors = require("colors");

const mainRouter = require("./routes/mainRouter");
const connectDB = require("./db");

const app = express();

connectDB();

app.use(mainRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow));
