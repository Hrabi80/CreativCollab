var express = require('express');
var router = express.Router();
var cors = require('./cors');
const bodyParser = require('body-parser');
var authenticate = require('../authentificate');
var passport = require('passport');
var message = require('../models/message');
var contact = require('../models/contact');

router.get('/getUserById/:id', cors.corsWithOptions, (req, res, next) => {
  //.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  message.findById(req.params.id)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
});

router.get('/getAssociationById/:id', cors.corsWithOptions, (req, res, next) => {
  //.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  user.findById(req.params.id)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
});

router.post('/sendMessage', cors.corsWithOptions, (req, res, next) => {
  //.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  message.create(req.body)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ succes: 'success!' });
    }, (err) => next(err))
    .catch((err) => next(err))
});

router.put('/editContact', cors.corsWithOptions, (req, res, next) => {
  //.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus(200); })
  contact.updateOne(req.body)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ succes: 'success!' });
    }, (err) => next(err))
    .catch((err) => next(err))
});

module.exports = router;