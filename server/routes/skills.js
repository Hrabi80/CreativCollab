const express = require('express');
const SkillsRouter = express.Router();
var authenticate  = require('../authenticate');
const Skills = require('../models/skills');
const bodyParser = require('body-parser');

SkillsRouter.use(bodyParser.json());



SkillsRouter.route('/')
.get(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Skills.find({})
    .then((skill) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(skill);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Skills.create(req.body)
    .then((skill) => {
        console.log('skill Created ', skill);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(skill);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /skill');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Skills.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});






/*-------------------------------------------------------------------------------------*/ 




SkillsRouter.route('/:skillId')
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Skills.findByIdAndUpdate(req.params.skillId, {
        $set: req.body
    }, { new: true })
    .then((skill) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(skill);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Skills.findByIdAndRemove(req.params.skillId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = SkillsRouter;