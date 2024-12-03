const asyncHandler = require("express-async-handler");
const query = require("../model/query.js")

const getHome = asyncHandler(async (req, res) => {
    res.render('index')
    res.end()
})

const getSignUp = asyncHandler(async (req, res) => {
    res.render('sign-up')
    res.end()
})

const getLogIn = asyncHandler(async (req, res) => {
    res.render('log-in')
    res.end()
})

const getCreateMessage = asyncHandler(async (req, res) => {
    res.render('createMessage')
    res.end()
})

const getMembership = asyncHandler(async (req, res) => {
    res.render('beMember')
    res.end()
})

module.exports ={
    getHome,
    getSignUp,
    getLogIn,
    getCreateMessage,
    getMembership
}