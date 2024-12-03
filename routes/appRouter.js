const { Router } = require("express");
const bodyParser = require('body-parser');
const appRouter = Router();
const controller = require("../controllers/controller.js");
const { validator } = require("../controllers/validators/validateSignUp.js");

// const homeController = require("../controllers/homeController.js")

// const { validator, editValidator } = require("../controllers/validators/validateProduct.js");

appRouter.use(bodyParser.urlencoded({ extended: true }));


// appRouter.post("/sign-up", validator, controller.postSignUp)
appRouter.get("/sign-up", controller.getSignUp)
appRouter.post("/sign-up", validator, controller.postSignUp)
appRouter.get("/log-in", controller.getLogIn)
appRouter.get("/message", controller.getCreateMessage)
appRouter.get("/member", controller.getMembership)
appRouter.get("/", controller.getHome)

module.exports = appRouter