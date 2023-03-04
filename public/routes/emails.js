const express = require('express');
const router = express.Router();
const searchQuery = require("../js/recipes");

router.get('/', (req, res) => {
    res.send('In emails')
});

module.exports = router;