const express = require('express');
const invitRouter = express.Router();
var authenticate  = require('../authentificate');
const invits = require('../models/invit');
const bodyParser = require('body-parser');

invitRouter.use(bodyParser.json());

invitRouter.route('/')
.get((req,res,next) => {
    invits.find({})
    .then((event) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    invits.create(req.body)
    .then((event) => {
        console.log('event Created ', event);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /event');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    invits.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

invitRouter.route('/:eventId')
.get((req,res,next) => {
    invits.findById(req.params.eventId)
    .then((event) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /event/'+ req.params.eventId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    invits.findByIdAndUpdate(req.params.eventId, {
        $set: req.body
    }, { new: true })
    .then((event) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    invits.findByIdAndRemove(req.params.eventId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});








/*-------------------------------------------------------------------------------------*/ 












 
module.exports = invitRouter;