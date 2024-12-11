const asyncHandler = require("express-async-handler");
const query = require("../model/query.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
require('dotenv').config()

const getHome = asyncHandler(async (req, res) => {
    let messages = await query.getMessagesWithUsers()
    
    res.render('index', {messages: messages, errors: null}

    )
    
})

const logOut = asyncHandler(async (req, res) => {
    req.logout((err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/");
      });
})

function viewCounter(req) {
    if(req.session.viewcount) {
        req.session.viewcount++
    }
    else {
        req.session.viewcount = 1
    }
}

const getSignUp = asyncHandler(async (req, res) => {
    res.render('sign-up', {errors: null})

})

const getLogIn = asyncHandler(async (req, res) => {
    
    res.render('log-in', {failure: req.query.failure?true:null})
    
})

const getCreateMessage = asyncHandler(async (req, res) => {
    res.render('createMessage', {errors: null})
    
})

const postMessage = asyncHandler(async (req, res) => {
    console.log(req.body, req.user)
    const result = validationResult(req)
   
    if(result.isEmpty()) {
        console.log('success')
        query.saveMessage(req.body.mTitle, req.body.messager, req.user.id)
        res.redirect('/')
    }
    else {
       
        console.log('validator erros', result)
        res.render('createMessage', {errors: result.array()})
        
    }
    
})

const getMembership = asyncHandler(async (req, res) => {
    console.log('yep', req.user)
    res.render('beMember', )
    
})

const postSignUp = asyncHandler(async (req, res) => {
    const result = validationResult(req)
    console.log(req.body)
    if(result.isEmpty()) {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if(err) {
                console.log(err) 
                res.render('sign-up', {errors: null})
            }
            else {
                console.log('hashed', hashedPassword)
                let admin = (req.body.adminPassword == process.env.ADMINPASSWORD)
                query.createUser(req.body.firstName, req.body.lastName, req.body.userName, hashedPassword, false, admin)
                res.redirect('/')
            }
          });
    }
    else {
       
        console.log('validator erros', result)
        res.render('sign-up', {errors: result.array()})
        // res.render('sign-up', {
        //     errors: result.array()
        // })
    }
    
})

const setMembership = asyncHandler(async (req, res) => {
    console.log('ya', req.user)
    console.log(req.body.memberApp)
    let guess = query.capitalizeFirstLetter(req.body.memberApp)
    if (guess === process.env.RIDDLEANSWER) {
    query.setMember(req.user.id)
    res.redirect('/')}
    
})

module.exports ={
    getHome,
    getSignUp,
    getLogIn,
    getCreateMessage,
    getMembership,
    postSignUp,
    logOut,
    setMembership,
    postMessage
}