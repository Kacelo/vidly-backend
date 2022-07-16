
// import express
const express = require("express");

// create server appliicatin
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index', {title:'My express API', message:'Hello and Welcome'})
  });

  module.exports = router;