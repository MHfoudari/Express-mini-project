const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: String, required: true },
  posterImage: { type: String, required: true },
  ratings: [
    Number,
    // required: true,
    // min: 0,
    // max: 10,,,,
  ],
});
module.exports = model("Movie", MovieSchema);
