const { body } = require("express-validator");

const validator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Name required length 1-20")
    .bail()
    .isLength({ min: 1, max: 20 })
    .withMessage("Name required length 1-20")
    .bail()
    .isAlpha()
    .withMessage("Name only contains letters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Name required length 1-30")
    .bail()
    .isLength({ min: 1, max: 30 })
    .withMessage("Name required length 1-30")
    .bail()
    .isAlpha()
    .withMessage("Name only contains letters"),
  body("userName")
  .trim()
  .notEmpty()
  .withMessage("Username required length 1-20")
  .bail()
  .isLength({ min: 1, max: 20 })
  .withMessage("Name required length 1-20")
  .bail()
  .isAlphanumeric()
  .withMessage("Must be Alphanumeric"),
  body("password") 
  .trim()
  .notEmpty()
  .withMessage("Password Required")
  .bail()
  .isLength({ min: 1, max: 20 })
  .withMessage("Length must be between 1-20"),
  body("confirmPassword") 
  .trim()
  .custom((value, { req }) => {
    return value === req.body.password;
  }).withMessage("Passwords do not Match"),
  body("adminPassword") 
  .optional()
  .trim()
  .custom((value, { req }) => {
    return value === process.env.ADMINPASSWORD;
  }).withMessage("Password incorrect"),
 
  

]
const loginValidator = [
  body("userName")
  .trim()
  .notEmpty()
  .withMessage("Username required length 1-20")
  .bail()
  .isLength({ min: 1, max: 20 })
  .withMessage("Name required length 1-20")
  .bail()
  .isAlphanumeric()
  .withMessage("Must be Alphanumeric"),
  body("password") 
  .trim()
  .notEmpty()
  .withMessage("Password Required")
  .bail()
  .isLength({ min: 1, max: 20 })
  .withMessage("Length must be between 1-20"),
];

module.exports = {
  validator,
  loginValidator,
};
