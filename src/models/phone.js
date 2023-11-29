const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.db");

class Phone {
  static getPhonesByUserId(userId, callback) {
    db.all("SELECT * FROM phones WHERE userId = ?", [userId], (err, rows) => {
      callback(err, rows);
    });
  }

  static addPhone(phone, callback) {
    const { number, userId } = phone;
    db.run(
      "INSERT INTO phones (number, userId) VALUES (?, ?)",
      [number, userId],
      function (err) {
        callback(err, this.lastID);
      }
    );
  }
}

module.exports = Phone;
