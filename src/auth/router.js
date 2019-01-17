'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');

authRouter.post('/signup', (req, res, next) => {
  req.body.signin_time = Date.now();
  let user = new User(req.body);

  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);//
    }).catch(next);
});

authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/testing', auth, (req, res, next)=>{
  res.status(200).send('ok');
});


// authRouter.get('/oauth', (req,res,next) => {
//   oauth.authorize(req)
//     .then( token => {
//       res.status(200).send(token);
//     })
//     .catch(next);
// });

module.exports = authRouter;
