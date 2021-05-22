const express = require('express');
const mongoose= require('mongoose');

const FormateurSchema = new mongoose.Schema({
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

const Formateurs = mongoose.model('Formateur',FormateurSchema );

module.exports = Formateurs;

