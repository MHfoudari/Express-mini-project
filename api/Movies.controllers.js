const Movie = require("../Model/Movie");

exports.fetchMovie = async (movieId) => {
  console.log("fetch", movieId);
  const foundMovie = await Movie.findById(movieId);
  return foundMovie;
};

exports.MovieGet = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.json(movies);
  } catch (error) {
    return next(error);
  }
};

exports.MovieCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.posterImage = `${req.file.path.replace("\\", "/")}`;
    }
    console.log(req.body);
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.MovieUpdate = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.movie);
    console.log(req.movie);
    await req.movie.updateOne(req.body);
    return res.status(201).end();
  } catch (error) {
    return next(error);
  }
};

exports.MovieDelete = async (req, res) => {
  try {
    await req.movie.deleteOne();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.MovieRating = async (req, res, next) => {
  try {
    if (req.body.ratings <= 10 && req.body.ratings >= 0) {
      const updatedRating = await Movie.findByIdAndUpdate(
        req.movie._id,
        { $push: { ratings: [req.body.ratings] } },
        {
          new: true,
        }
      );
      return res.status(201).json(updatedRating);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid rating must be between 0-9" });
    }
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};
