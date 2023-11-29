const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/users", (req, res) => {
  const { filter } = req.query;

  if (filter) {
    User.getUsersWithFilter(filter, (err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ users });
    });
  } else {
    User.getAllUsers((err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ users });
    });
  }
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  User.getUserById(userId, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ user });
  });
});

router.post("/users", (req, res) => {
  const user = req.body;
  User.createUser(user, (err, userId) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ userId });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.login(email, password, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ user });
  });
});

module.exports = router;
