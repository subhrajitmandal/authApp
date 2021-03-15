const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb+srv://subhrajit:Subh@1234@cluster0.m84sk.mongodb.net/resume?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true },err =>{
    if(err){
        console.error('Error!' + err)
    }
    else{
        console.log('MongoDB Connected')
    }
})

router.get('/',(req, res)=>{
    res.send('API route');
})

router.post('/register',(req, res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error){
            console.log("Error: " + error);
        }
        else{
			let payload = {subject: registeredUser._id}
			let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error)
        }      
        else{
            if(!user) {
                res.status(401).send('Invalid Email')
            }
            else if(user.password != userData.password){
                res.status(401).send('Invalid Password')
            }
            else{
				let payload = {subject: user._id}
				let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }  
    
});
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id" : 1,
            "name" : "Subhrajit",
            "description" : "Lorem Ipsum",
            "age" : 31
        },
        {
            "_id" : 2,
            "name" : "Lokesh",
            "description" : "Lorem Ipsum",
            "age" : 32
        },
        {
            "_id" : 3,
            "name" : "Santosh",
            "description" : "Lorem Ipsum",
            "age" : 33
        },
        {
            "_id" : 4,
            "name" : "Ashutosh",
            "description" : "Lorem Ipsum",
            "age" : 21
        },
        {
            "_id" : 5,
            "name" : "Ranjan",
            "description" : "Lorem Ipsum",
            "age" : 31
        }
    ]
    res.json(events);
})

router.get('/special', (req, res) => {
    let events = [
        {
            "_id" : 1,
            "name" : "Subhrajit Mandal",
            "description" : "Lorem Ipsum",
            "age" : 31
        },
        {
            "_id" : 2,
            "name" : "Lokesh Pattnaik",
            "description" : "Lorem Ipsum",
            "age" : 32
        },
        {
            "_id" : 3,
            "name" : "Santosh Dash",
            "description" : "Lorem Ipsum",
            "age" : 33
        },
        {
            "_id" : 4,
            "name" : "Ashutosh Rana",
            "description" : "Lorem Ipsum",
            "age" : 21
        },
        {
            "_id" : 5,
            "name" : "Ranjan Kumar",
            "description" : "Lorem Ipsum",
            "age" : 31
        }
    ]
    res.json(events);
})

module.exports =router;