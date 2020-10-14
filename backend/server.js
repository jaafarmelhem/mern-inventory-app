const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const deviceRoutes = express.Router();
const PORT = 4000;

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const DATA = [ // should be a database or something persistant
    {email:"test@gmail.com", password:"1234"}, // user data from email-password
    {email:"test2@gmail.com", provider:"facebook"} // user data from OAuth has no password
  ]


// Config
const config = {secretOrKey:"mysecret"}

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cookieParser())
app.use(passport.initialize()); 


// Utility functions for checking if a user exists in the DATA array - Note: DATA array is flushed after every restart of server
function FindOrCreate(user){
    if(CheckUser(user)){  // if user exists then return user
        return user
    }else{
        DATA.push(user) // else create a new user
    }
}
function CheckUser(input){
    for (var i in DATA) {
        if(input.email==DATA[i].email && (input.password==DATA[i].password || DATA[i].provider==input.provider))
            return true // found
        else
            null //console.log('no match')
      }
    return false // not found
}


var opts = {}
opts.jwtFromRequest = function(req) { // tell passport to read JWT from cookies
    var token = null;
    if (req && req.cookies){
        token = req.cookies['jwt']
    }
    return token
}
opts.secretOrKey = config.secretOrKey

// main authentication, our app will rely on it
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("JWT BASED AUTH GETTING CALLED") // called everytime a protected URL is being served
    if (CheckUser(jwt_payload.data)) {
        return done(null, jwt_payload.data)
    } else {
        // user account doesnt exists in the DATA
        return done(null, false)
    }
}))

passport.use(new GoogleStrategy({
    clientID: "1038574997890-0mpugpgh22cb956t160seko9cn4uo41c.apps.googleusercontent.com",
    clientSecret: "NROxRNWUxJZmkar_YNYa--Fu",
    callbackURL: "http://localhost:5000/googleRedirect"
  },
  function(accessToken, refreshToken, profile, done) {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
      return done(null, profile)
  }
))

passport.use(new FacebookStrategy({
    clientID: '378915159425595',//process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: '7bd791932eaf12fbb75d0166721c0e02',//process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: "http://localhost:5000/facebookRedirect", // relative or absolute path
    profileFields: ['id', 'displayName', 'email', 'picture']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    console.log("FACEBOOK BASED OAUTH VALIDATION GETTING CALLED")
    return done(null, profile)
  }))
  
// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser(function(user, done) {
    console.log('I should have jack ')
    done(null, user)
})
passport.deserializeUser(function(obj, done) {
    console.log('I wont have jack shit')
    done(null, obj)
})



let Device = require('./device.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/devices', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

deviceRoutes.route('/').get(function(req, res) {
    Device.find(function(err, devices) {
        if (err) {
            console.log(err);
        } else {
            res.json(devices);
        }
    });
});

deviceRoutes.route('/delete/:id').post(function(req, res) {
    Device.findById(req.params.id, function(err, device) {
        if (!device)
            res.status(404).send("data is not found");
        else
            device.remove().then(device => {
                res.json('Device deleted!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

deviceRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Device.findById(id, function(err, device) {
        res.json(device);
    });
});

deviceRoutes.route('/update/:id').post(function(req, res) {
    Device.findById(req.params.id, function(err, device) {
        if (!device)
            res.status(404).send("data is not found");
        else
            device.device_name = req.body.device_name;
            device.device_description = req.body.device_description;
            device.device_quantity = req.body.device_quantity;
            device.device_responsible = req.body.device_responsible;
            device.device_priority = req.body.device_priority;
            device.device_completed = req.body.device_completed;

            device.save().then(device => {
                res.json('Device updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

deviceRoutes.route('/add').post(function(req, res) {
    let device = new Device(req.body);
    device.save()
        .then(device => {
            res.status(200).json({'device': 'device added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new device failed');
        });
});

app.use('/devices', deviceRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
