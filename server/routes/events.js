const express = require('express');
const eventRouter = express.Router();
var cors = require('./cors');
var authenticate  = require('../authentificate');
const Events = require('../models/events');
const bodyParser = require('body-parser');

eventRouter.use(bodyParser.json());

eventRouter.route('/')
.get((req,res,next) => {
    Events.find({})
    .then((event) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
    Events.create(req.body)
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
    Events.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

eventRouter.route('/:eventId')
.get((req,res,next) => {
    Events.findById(req.params.eventId)
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
    Events.findByIdAndUpdate(req.params.eventId, {
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
    Events.findByIdAndRemove(req.params.eventId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});








/*-------------------------------------------------------------------------------------*/ 




eventRouter.route('/:eventId/users')
.get((req,res,next) => {
    Events.findById(req.params.eventId)
    .then((event) => {
        if (event != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(event.users);
        }
        else {
            err = new Error('event ' + req.params.eventId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Events.findById(req.params.eventId)
    .then((event) => {
        if (event != null) {
            event.users.push(req.body);
            event.save()
            .then((event) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(event);                
            }, (err) => next(err));
        }
        else {
            err = new Error('event ' + req.params.eventId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /events/'
        + req.params.eventId + '/users');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Events.findById(req.params.eventId)
    .then((event) => {
        if (event != null) {
            for (var i = (event.users.length -1); i >= 0; i--) {
                event.users.id(event.users[i]._id).remove();
            }
            event.save()
            .then((event) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(event);                
            }, (err) => next(err));
        }
        else {
            err = new Error('event ' + req.params.eventId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

eventRouter.route('/:eventId/users/:userId')
.get((req,res,next) => {
    Events.findById(req.params.eventId)
    .then((event) => {
        if (event != null && event.users.id(req.params.userId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(event.users.id(req.params.userId));
        }
        else if (event == null) {
            err = new Error('event ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('usert ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /events/'+ req.params.eventId
        + '/userId/' + req.params.userId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    Events.findById(req.params.eventId)
    .then((event) => {
        const istheuser= req.user._id.equals(event.users.id(req.params.userId).author._id);
        if (event != null && event.users.id(req.params.userId) != null && istheuser) {
            if (req.body.rating) {
                event.users.id(req.params.userId).rating = req.body.rating;
            }
            if (req.body.user) {
                event.users.id(req.params.userId).user = req.body.user;                
            }
            event.save()
            .then((event) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(event);                
            }, (err) => next(err));
        }
        else if (event == null) {
            err = new Error('event ' + req.params.eventId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('user ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Events.findById(req.params.eventId)
    .then((event) => {
        const istheuser= req.user._id.equals(req.body.author);
        if (event != null && event.users.id(req.params.userId) != null && istheuser) {
            event.users.id(req.params.userId).remove();
            event.save()
            .then((event) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(event);                
            }, (err) => next(err));
        }
        else if (event == null) {
            err = new Error('event ' + req.params.eventId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('user ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


 
module.exports = eventRouter;