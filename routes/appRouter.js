const { Router } = require("express");
const bodyParser = require('body-parser');
const appRouter = Router();
const controller = require("../controllers/controller.js");
const { validator, loginValidator } = require("../controllers/validators/validateSignUp.js");
const passport = require("passport");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const dbPool = require("../model/pool");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs")
const { validateMember } = require("../controllers/validators/validateMember.js");

// const homeController = require("../controllers/homeController.js")

// const { validator, editValidator } = require("../controllers/validators/validateProduct.js");

appRouter.use(bodyParser.urlencoded({ extended: true }));
appRouter.use(
    session({
      store: new pgSession({
        pool: dbPool, // Connection pool
        tableName: "user_sessions", // Use another table-name than the default "session" one
        createTableIfMissing: true,
        // Insert connect-pg-simple options here
      }),
      secret: process.env.FOO_COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
      // Insert express-session options here
    })
  );
  appRouter.use(passport.session());
  
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await dbPool.query(
          "SELECT * FROM users WHERE username = $1",
          [username]
        );
        const user = rows[0];
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await dbPool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      const user = rows[0];
  
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
  appRouter.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });



 

// appRouter.post("/sign-up", validator, controller.postSignUp)
appRouter.get("/sign-up", controller.getSignUp)
appRouter.post("/sign-up", validator, controller.postSignUp)
appRouter.get("/log-in", controller.getLogIn)
appRouter.post("/log-in", loginValidator, passport.authenticate("local", {successReditect: "/", failureRedirect: "/"}), controller.getHome);
// appRouter.post("/log-in", func);
appRouter.get("/log-out", controller.logOut);
appRouter.get("/message", controller.getCreateMessage)
appRouter.get("/member", controller.getMembership)
appRouter.post("/beMember", validateMember, controller.setMembership)
appRouter.get("/", controller.getHome)

module.exports = appRouter