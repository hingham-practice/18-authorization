'use strict';

const User = require('./users-model.js');

module.exports = (req, res, next) => {

  // Basic am9objpqb2hubnk=
  // Bearer Token ...
  try {
    let [authType, authString] = req.headers.authorization.split(/\s+/);

    switch( authType.toLowerCase() ) {
    case 'basic':
      return _authBasic(authString);

    case 'bearer':
      return _authBearer(authString);

    default:
      return _authError();
    }

  }
  catch(e) {
    console.log(e);
  }


  function _authBasic(str) {
    // str: am9objpqb2hubnk=
    let base64Buffer = Buffer.from(str, 'base64'); // <Buffer 01 02 ...>
    let bufferString = base64Buffer.toString(); // john:mysecret
    let [username, password] = bufferString.split(':'); // john='john'; mysecret='mysecret']
    let auth = {username,password}; // { username:'john', password:'mysecret' }
    
    return User.authenticateBasic(auth)
      .then( (user) => {
        //convert time to seconds
        _authenticate(user);
        //call something that will regenerate the token
       
      }).catch(console.error('error'));
  }

  function _authBearer(str){
    return User.authenticateToken(str)
      .then(user => {
        let currentTime = Date.now();
        console.log('current time', currentTime);
        let diff = (currentTime - user.signin_time)/10000;
        console.log('user before', user);

        console.log('diff',diff);
        if(diff < 4){          
          user.updateTime();
          _authenticate(user)
        }
        else{
          _timeout();
          user.updateTime();
        }
      })
      .catch(next);
  }

  function _authenticate(user) {
    console.log({user});
    if(user) {
      req.user = user;
      req.token = user.generateToken();
      next();
    }
    else {
      _authError();
    }
  }

  function _authError() {
    next('Invalid User ID/Password');
  }

  function _timeout(){
    next('Session timeout. Please signin again.');
  }

};
