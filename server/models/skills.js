const express = require('express');
const mongoose= require('mongoose');

const skillsSchema = new mongoose.Schema({
    name : {
        type : String 
    },
    icon : {
        type : String 
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]

});

const skills = mongoose.model('skills',skillsSchema);

module.exports = skills;

