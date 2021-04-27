const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const user = require('../models/User');

module.exports = function(passport) {
    passport.use(new googleStrategy({
        clientID : process.env.GOOGLE_CLIENT_ID,   
        clientsecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : 'auth/google/callback'
    },
    async (accessToken, refreshToken , porfile , done) => {
        console.log(profile);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      }); 
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user)
        );
      });
}