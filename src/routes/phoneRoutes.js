const express = require("express");
const router = express.Router();
const Phone = require("../models/phone");

router.get("/phones/:userId", (req, res) => {
  const userId = req.params.userId;
  Phone.getPhonesByUserId(userId, (err, phones) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ phones });
  });
});

router.post("/phones", (req, res) => {
  const phone = req.body;
  Phone.addPhone(phone, (err, phoneId) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ phoneId });
  });
});

module.exports = router;
