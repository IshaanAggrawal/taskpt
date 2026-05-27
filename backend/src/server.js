const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/tasks", require("./routes/task.route"));

module.exports = app;
