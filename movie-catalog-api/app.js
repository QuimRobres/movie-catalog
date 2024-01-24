require("dotenv").config();
const express = require("express");

require("./configs/db.config");

const app = express();

require("./configs/middleware.config")(app);
require("./configs/cors.config")(app);

require("./configs/session.config")(app);
require("./configs/passport.config")(app);

const moviesRouter = require("./routes/movies.routes");
app.use("/api/movies", moviesRouter);

const authRouter = require("./routes/auth.routes");
app.use("/api", authRouter);

module.exports = app;
