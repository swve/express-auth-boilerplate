const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DBCONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db :) ")
);

// Middlewares
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);






app.listen(3000, () => console.log("Server up"));
