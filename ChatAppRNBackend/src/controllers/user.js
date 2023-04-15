const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();


exports.signUp = async function(req, res) {
    try{
        if(!req.body) {
            throw new Error("Please provide username, email, password and confirm password!");
        }
        if(!req.body.name) {
            throw new Error("Please enter your name!");
        }
        if(!req.body.email) {
            throw new Error("Please enter your email!");
        }
        if(!req.body.username) {
            throw new Error("Please enter your username!");
        }
        if(!req.body.password) {
            throw new Error("Please enter a password!");
        }
        if(!req.body.confirmPassword) {
            throw new Error("Please re-enter the password you just typed!");
        }

        if(req.body.password !== req.body.confirmPassword) {
            throw new Error("Passwords don't match! Please try again!");
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      
        const user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        const createdUser = await db.user.create(user)
     
        res.send({
            message: "User created successfully!",
            data: createdUser,
            success: true,
            headers: {"Access-Control-Allow-Origin": "*"}
        })
    } catch(error) {        
        res.send({
            message: error.message,
            success: false
        })
    }
};

exports.logIn = async function(req, res) {
    try{
        if(!req.body) {
            throw new Error("Please provide username and password!");
        } else if(!req.body.username) {
            throw new Error("Please provide username!");
        } else if(!req.body.password) {
            throw new Error("Please provide password!");
        }
        const getUserByUsername = await db.user.findOne({ where: { username: req.body.username }});
        if(!getUserByUsername) {
            throw new Error("User not found!");
        }
        const validPassword = await bcrypt.compare(req.body.password , getUserByUsername.password)

        if(!validPassword) {
            return res.status(404).send({ 
                message: "Invalid password.", 
                success: false 
            })
        }
        const token = jwt.sign({ _id: getUserByUsername._id, email: getUserByUsername.email }, process.env.jwtSecret);
        res.send({ 
            message: "User logged in successfully!", 
            data: { 
                token, 
            }, 
            success: true,
            headers: {"Access-Control-Allow-Origin": "*"}
        })
    } catch(error) {
        console.log(error);
        res.status(400).send({
            message: error.message,
            success: false,
            headers: {"Access-Control-Allow-Origin": "*"}
        })
    }
};

