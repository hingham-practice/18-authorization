![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Project Name: JWT Security

### Author: Hannah Ingham

### Links and Resources
* [repo](https://github.com/hingham/18-authorization)
* [![Build Status](https://www.travis-ci.com/hingham/18-authorization.svg?branch=master)](https://www.travis-ci.com/hingham/18-authorization)
* [back-end](https://authorization-hi.herokuapp.com/) 

### Modules: Middleware.js; router.js; users-model.js

##### Exported Values and Methods: authRouter, middleware.js

###### `foo(thing) -> string`
npm start
signup: echo `{"username":"example","password":"example-password"}' | http post :4000/signup`
Basic singin: `signin: http :4000/signin -a example:example-password`
Bearr signin: `signin: http :4000/testing "Authorization:Bearer ENTER-TOKEN-HERE`

Automatic signout: User will be automatically signed out and asked to login again after 5 seconds


### Setup
#### `.env` requirements
* `PORT` - 4000
* `MONGODB_URI` - mongodb://localhost:27017/users
* `SECRET` - string for mongo secret

#### Running the app
* `npm start`
* Endpoint: `/signin`
  * Enters user in the mongo database
* Endpoint: `/singin`
  * Signs in a user with correct credentials
* Endpoint: `/testing`
  * Signs in a user with bearer authorization (with a token)
 

#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
![image](./auth-server/assets/authorize-uml.JPG)


