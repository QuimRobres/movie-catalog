const express = require("express");
const Movie = require("../models/Movie.model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id/comments", (req, res, next) => {
  const { id } = req.params;
  Movie.findOne({ _id: id })
    .then((movie) => res.status(200).json(movie))
    .catch((err) => res.status(500).json(err));
});

router.post("/:id/postComment", (req, res, next) => {
  const { id } = req.params;
  const { comment, title, userId } = req.body;
  const newComment = {
    comment: comment,
    title: title,
    userId: userId,
  };
  Movie.findOneAndUpdate(
    { _id: id },
    { $push: { comments: newComment } },
    { new: true }
  )
    .then(() => res.status(200).json({ message: "Comment added" }))
    .catch((err) => res.status(500).json(err));
});

router.post("/:id/rate", async (req, res) => {
  const { id } = req.params;
  const { rate, userId } = req.body;

  const movieData = await Movie.findOne({ _id: id });

  if (!movieData) return res.status(404).json({ message: "Movie not found" });

  const rateValues = movieData.rateList?.map((rateItem) => {
    return rateItem;
  });

  const rateExists = rateValues.some((item) => item.userId === userId);

  if (!rateExists) {
    rateValues.push({ rate: rate, userId: userId });
  }

  const calculateRateAverage = () => {
    let total = 0;
    rateValues.forEach((rate) => {
      total += rate.rate;
    });
    return total / rateValues.length;
  };

  const newAverageRate = calculateRateAverage();

  Movie.findOneAndUpdate(
    { _id: id },
    { rateList: rateValues, averageRate: newAverageRate },
    { new: true }
  ).then((res) => {
    console.log("test kimo res", res);
  });
  console.log("rateValue", rateValues);
});

router.post("/", (req, res, next) => {
  const { title, synopsis, cover, averageRate } = req.body;
  Movie.create({ title, synopsis, cover, averageRate })
    .then((movie) => res.status(200).json(movie))
    .catch((error) => console.error(error));
});

module.exports = router;
