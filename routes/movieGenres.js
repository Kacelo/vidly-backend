// import express
const express = require("express");
// create server appliicatin
const router = express.Router();
// require Joi for form validation
const Joi = require("joi");
// movie genre array
const genres = [
    { id: 1, genreName: "Sci-Fi" },
    { id: 2, genreName: "Comedy" },
    { id: 3, genreName: "Action" },
    { id: 4, genreName: "Romance" },
  ];
  
  // Joi Validation
  const schema = Joi.object({
    genreName: Joi.string().min(3).required(),
  });
  
  // GET request to get ALL genres
  router.get("/", (req, res) => {
    // return entire array
    res.send(genres);
  });
  
  // GET exactly 1 at specified id
  router.get("/:id", (req, res) => {
    // 1. check if file exists
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    // 2. if not send 404 not found
    if (!genre) {
      return res.status(404).send("genre not found at spefified ID");
    } else {
      // else return file at specified param
      res.send(genre);
    }
  });
  
  // POST route handler to create an Object
  router.post("/", (req, res) => {
    // 1. Validate schema before adding a ne file
    const { error } = schema.validate(req.body);
    // if not found send bad request response 404
    if (error) {
      return res.status(404).send(error.details[0].message);
    }
    // if there are no errors then add new file to array with push method
    // first create file
    const genre = {
      id: genres.length + 1,
      // key value pair of name and its value
      genreName: req.body.genreName,
    };
    // push to array
    genres.push(genre);
    // return newly updated array with new file
  
    res.send(genre);
  });
  
  // PUT router handler to UPDATE or EDIT existing file data
  router.put("/:id", (req, res) => {
    // 1. check if it exists
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    // 2. if not send 404 response
    if (!genre)
      return res.status(404).send("genre with the specified id was not found");
  
    // 3. validate schema
    const { error } = schema.validate(req.body);
    // if step 3 is not succesfull, send bad request
    if (error) {
      return res.status(404).send(error.details[0].message);
    }
    // 4. if all is well, update file
    genre.genreName = req.body.genreName;
    // return updated array
    res.send(genre);
  });
  
  router.delete("/:id", (req, res) => {
    // 1. check if the file at id exists
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    // 2. if not send 404 not found response
    if (!genre)
      return res
        .status(404)
        .send("gender at specified ID has not been found or does not exist");
  
    // no need to validate when deleting
    // 4.if all is good, find index of data
    const indexOfGenre = genres.indexOf(genre);
    // 6.use index to splice from array
    genres.splice(indexOfGenre, 1);
    // 7.return newly updated array with one less member
    res.send(genre);
  });

  module.exports = router;