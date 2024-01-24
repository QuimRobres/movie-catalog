const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    title: { type: String },
    comment: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const rateSchema = new Schema({
  userId: { type: String, required: true },
  rate: { type: Number, required: true },
});

const movieSchema = new Schema({
  title: { type: String, required: true },
  synopsis: { type: String, required: true },
  cover: { type: String, required: true },
  averageRate: { type: Number, required: true },
  rateList: [rateSchema],
  comments: [commentsSchema],
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
