var express = require('express');
var User = require("../models/user");
var auth = require("../modules/auth")
var router = express.Router();

// these routes are protected routes

// run the auth.validateToken middleware to protect these rotes
router.use(auth.validateToken);


// get single profile
router.get("/:username", (req,res) =>{
    User.findOne({username: req.params.username}, (err,user) => {
        if(err) return res.json({err});
        res.json({user});
    })
})

// follow user
router.post("/:username/follow", (req,res) =>{
    var username = req.params.username;
    User.findOne({username}, (err,user) =>{
        if(err) return res.json({err});
        if(!user.followers.includes(username)){
            User.findOneAndUpdate({username}, {$push: {followers: req.user.username}}, (err,followinguser) =>{
                if(err) return res.json({err});
                User.findByIdAndUpdate(req.user.userId, {$push: {following: followinguser.username}}, (err,currentuser)=> {
                    if(err) return res.json({err});
                    res.json({currentuser, followinguser});
                })
            })
        }

    })
})


// unfollow 
router.delete("/:username/follow", (req,res) =>{
    var username = req.params.username;
    User.findOne({username}, (err,user) =>{
        if(err) return res.json({err});
        if(user.followers.includes(username)){
            User.findOneAndUpdate({username}, {$pull: {followers: req.user.username}}, (err,followinguser) =>{
                if(err) return res.json({err});
                User.findByIdAndUpdate(req.user.userId, {$pull: {following: followinguser.username}}, (err,currentuser)=> {
                    if(err) return res.json({err});
                    res.json({currentuser, followinguser});
                })
            })
        }

    })
})



module.exports = router;
