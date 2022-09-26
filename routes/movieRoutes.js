const express = require('express');
const movieController = require('../controllers/movieControllers');
const { validateMovie, validateMovieId } = require('../utils/validation');

const movieRoutes = express.Router();

movieRoutes.get('/', movieController.getMovies);
movieRoutes.post('/', validateMovie, movieController.addMovie);
movieRoutes.delete('/:_id', validateMovieId, movieController.deleteMovie);

module.exports = { movieRoutes };
