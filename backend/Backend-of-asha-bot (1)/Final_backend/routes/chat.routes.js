const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');


router.get('/', (req, res) => {
  res.json({ message: "Chat API is working" });
});

router.post('/', chatController.sendMessage); 



module.exports = router;
