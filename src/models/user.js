const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.db");
const Phone = require("./phone");

class User {
  static getAllUsers(callback) {
    const query = `
    SELECT users.name, users.email
    FROM users
    WHERE isAdmin = 0
  `;

    db.all(query, (err, users) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, users);
      }
    });
  }

  static getUsersWithFilter(filter, callback) {
    const query = `
      SELECT users.name, users.email
      FROM users
      WHERE isAdmin = 0
      AND name LIKE '%${filter}%'
    `;

    db.all(query, (err, users) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, users);
      }
    });
  }

  static getUserById(userId, callback) {
    db.run(`SELECT * FROM users WHERE id = ${userId}`, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }

      if (!user) {
        callback(null, null);
        return;
      }

      Phone.getPhonesByUserId(userId, (phoneErr, phones) => {
        if (phoneErr) {
          callback(phoneErr, null);
          return;
        }

        user.phones = phones;
        callback(null, user);
      });
    });
  }

  static createUser(user, callback) {
    const { name, email, password, isAdmin } = user;

    db.run(
      "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
      [name, email, password, isAdmin],
      function (err) {
        callback(err, this);
      }
    );
  }

  static login(email, password, callback) {
    db.get(
      `SELECT * FROM users WHERE email = '${email}' and password = '${password}'`,
      (err, user) => {
        if (err) {
          callback(err, null);
          return;
        }

        if (!user) {
          callback(null, null);
          return;
        }

        callback(null, user);
      }
    );
  }
}

module.exports = User;
