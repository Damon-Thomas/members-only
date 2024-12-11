const { body } = require("express-validator");

const validateMessage = [
  body("mTitle")
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage("Subject required length 1-25"),
  body("messager")
    .trim()
    .isLength({ min: 1, max: 250 })
    .withMessage("Message required length 1-250"),
];

module.exports = {
  validateMessage,
};
