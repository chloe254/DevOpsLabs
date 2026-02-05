const db = require('../dbClient');

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error("Wrong user parameters"), null);

    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    };

    // Check if user already exists
    db.exists(user.username, (err, exists) => {
      if (err) return callback(err, null);
      if (exists) return callback(new Error("User already exists"), null);

      // Save to DB
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null);
        callback(null, res); // Return callback
      });
    });
  },

  get: (username, callback) => {
    if (!username) return callback(new Error("Username required"), null);

    db.exists(username, (err, exists) => {
      if (err) return callback(err, null);
      if (!exists) return callback(new Error("User not found"), null);

      db.hgetall(username, (err, user) => {
        if (err) return callback(err, null);
        // Return the full user object with username
        callback(null, { username, ...user });
      });
    });
  }
};