const { body } = require("express-validator");

const validateMember = [
  body("memberApp")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Name required length 1-20")
    
]

module.exports = {
  validateMember,
  
};
