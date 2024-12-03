const express = require("express");
const app = express();
const path = require("node:path");

const appRouter = require("./routes/appRouter")
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const dbPool = require("./model/pool")
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// const assetsPath = path.join(__dirname, "public");
// app.use(express.static(assetsPath));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
  store: new pgSession({
    pool : dbPool,                // Connection pool
    tableName : 'user_sessions',   // Use another table-name than the default "session" one
    createTableIfMissing: true
    // Insert connect-pg-simple options here
  }),
  secret: process.env.FOO_COOKIE_SECRET,
  resave: false,
  saveUninitialized:true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  // Insert express-session options here
}));
app.use(passport.session());


app.use("/", appRouter)
app.get("*",(req, res) => res.render("./errors/404.ejs") )

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`) 
});