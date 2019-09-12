var fs = require('fs');

var auth = {
    users: [fs.readFileSync('./data/users.json')],
    authorize: function (email, password) {
      var validUser = this.users.filter((user) => {
        return user.email === email && user.password === password;
      });
  
      if (validUser.length === 1) {
        return true;
      }
      return false;
    }
  };
  
  module.exports = {
    auth
  };