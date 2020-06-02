var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

//Trading ways Route
router.get("/tradingways", function(req, res){
    res.render("tradingways");
});

//Deposit/Investment Route
router.get("/deposits", function(req, res){
    res.render("deposits");
});

//About Route
router.get("/about", function(req, res){
    res.render("about");
});

//Get-started Route
router.get("/how-to-start", function(req, res){
    res.render("getstarted");
});

// for-traders Route
router.get("/for-traders", function(req, res){
    res.render("cmtools");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// dashboard route
router.get("/dashboard", function(req, res){
   res.render("dashboard"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(newUser);
            req.flash("error", err.message);
            return res.render("dashboard");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/dashboard"); 
        });
    });
});


//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "LOGGED YOU OUT!");
   res.redirect("/");
});


module.exports = router;