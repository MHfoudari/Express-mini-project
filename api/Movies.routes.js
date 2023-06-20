const uploader = require("../Middlewares/uploader");
const express = require("express");
const {
  fetchMovie,
  MovieCreate,
  MovieUpdate,
  MovieDelete,
  MovieGet,
  MovieRating,
} = require("./Movies.controllers");
const router = express.Router();

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const foundMovie = await fetchMovie(movieId);
    console.log(movieId);
    console.log(foundMovie);

    if (!foundMovie) return next({ status: 404, message: "movie not found" });
    console.log(foundMovie);
    req.movie = foundMovie;
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/", uploader.single("posterImage"), MovieCreate);
router.get("/", MovieGet);

router.put("/:movieId", uploader.single("posterImage"), MovieUpdate);
router.put("/rating/:movieId", MovieRating);

// router.post("/", MovieCreate);

router.delete("/:movieId", MovieDelete);

module.exports = router;
