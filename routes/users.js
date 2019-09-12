var express = require('express');
var router = express.Router();
var fs = require('fs');

const authorization = require('./../utils/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/* GET register page*/
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

// Get user data
router.get('/data', function(req, res, next) {
  try {
      res.end(fs.readFileSync('./data/users.json'));
  } catch (err) {
      res.end('[]');
  }
});

// post data
router.post('/login', function(request, response) {
  // get user data from form
  var email = request.body.email;
  var password = request.body.password;
  if (authorization.auth.authorize(email, password)) {
      response.statusCode = 200;
      response.end();
  } else {
      response.statusCode = 403; // Forbidden
      response.end();
  }
});

router.post('/register', function(request, response) {
  // get user data from form
  var email = request.body.email;
  var password = request.body.password;
})

// read persisted data from file
var getUsers = () => {
  try {
      var usersString = fs.readFileSync('users.json');
      return JSON.parse(usersString);
  } catch (err) {
      return [];
  }
};

// persist data in file
var saveUsers = (users) => {
  fs.writeFileSync('users.json', JSON.stringify(users));
};

// Insert a User
var insertUser = (username, password, email) => {
  var users = getUsers();

  // in ES6, if param and prop names are the same,
  // you can use the following syntax instead of
  // name: name, elev: elev
  var user = {
      username,
      password,
      email
  };

  // ensure no dups
  var duplicateUsers = users.filter((user) => {
      return (user.username === username || user.email === email);
  });

  // persist the users
  if (duplicateUsers.length === 0) {
      users.push(user);
      saveUsers(users);
      return user;
  }
};

// Get a single User by user name
var getUser = (username) => {
  var users = getUsers();
  // ES6 single-line command
  var filteredUsers = users.filter((user) => user.username === username);
  return filteredUsers[0];
};

module.exports = router, getUser, insertUser;
