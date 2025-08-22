/** @format */
const express = require("express");
const config = require("./app");
const cors = require("cors");
require("dotenv").config();

let app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app = config(app);

app.set("port", process.env.PORT || 5000);

const pool = require("./db");

pool
  .connect()
  .then(() => console.log("PostgreSQL Connected Successfully!"))
  .catch((err) => console.error("Could not connect to PostgreSQL:", err.message));

app.listen(app.get("port"), (error) => {
  if (!error) {
    console.log("Server running on port " + app.get("port"));
  } else {
    console.error("Error starting server:", error);
  }
});
