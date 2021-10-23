const path = require('path');
const express = require('express');

// Get routes
const router = express.Router();

//Getting Notes routes
router.get('/notes', (req, res)=>{
  res.sendFile(path.resolve(__dirname, '../public/notes.html'))
});

//Generalized re-route route
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"))
});

module.exports = router;