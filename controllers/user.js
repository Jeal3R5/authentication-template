const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/user");

const router = express.Router();


//Signup - GET - takes ups to the signup page
router.get("/signup", (req, res) => {
    res.render("signup.ejs");
})


//Signup = POST; Collect data from user and stores in DB
router.post('/signup', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))       //Capture password and hash it
    User.create(req.body, (err, user) => {     
        if(err) console.log(err)            //Store user data in the db
        res.redirect('/user/login')         //redirect to login page
    })
})



// Login - GET - takes us to the login page
router.get("/login", (req, res) => {
    res.render("login.ejs");
})



// Log in send user data to server - POST
router.post('/login', (req, res) => {
    const { username, password } = req.body;           //Look user up by username in DB
    User.findOne({username}, async (err, user) => {
        //if user doesn't exist we need to do something     
        if (err || !user) return res.send("User does not exist");           //compare password
        const passwordMatches = await bcrypt.compare(password, user.password);
        //or if it does not match redirect to 
        if (!passwordMatches) return res.send("Incorrect Password")
        // save login status in session
        req.session.loggedIn = true;
        req.session.username = username;
        //redirect to home - home checks for login
        res.redirect("/") 
    })
})



// Logout route - GET - destoys the 
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {      //kill the session
        res.redirect("/")               //redirect them home
    })
})




module.exports = router;