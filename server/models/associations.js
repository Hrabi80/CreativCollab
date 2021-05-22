const express = require('express');
const mongoose= require('mongoose');

const AssociationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }
    ]


});

const Associations = mongoose.model('Association',AssociationSchema );

module.exports = Associations;

