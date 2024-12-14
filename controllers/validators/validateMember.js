const { body } = require("express-validator");
require('dotenv').config()

const validateMember = [
  body("memberApp")
    .trim()
    .matches(process.env.RIDDLEANSWER)
    .withMessage("Answer Incorrect")
    
]

module.exports = {
  validateMember,
  
};
