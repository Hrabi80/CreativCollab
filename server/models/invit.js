const express = require('express');
const mongoose= require('mongoose');

const InvitionSchema = new mongoose.Schema({
    destinataire : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    expediteur : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, 
    responseinvi : {
        type : Boolean,
        default: false 
    },
    events: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }
    


});

const Invitions = mongoose.model('Invition',InvitionSchema );

module.exports = Invitions;

