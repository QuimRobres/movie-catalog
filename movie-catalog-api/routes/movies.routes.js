const express = require("express");
const Movie = require("../models/Movie.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ _id: id });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/:id/postComment", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment, title, userId } = req.body;
    const newComment = {
      comment,
      title,
      userId,
    };

    await Movie.findOneAndUpdate(
      { _id: id },
      { $push: { comments: { $each: [newComment], $position: 0 } } },
      { new: true }
    );

    res.status(200).json({ message: "Comment added" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/:id/rate", async (req, res) => {
  try {
    const { id } = req.params;
    const { rate, userId } = req.body;

    const movieData = await Movie.findOne({ _id: id });

    if (!movieData) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const rateValues = movieData.rateList?.map((rateItem) => rateItem) || [];

    const rateExists = rateValues.some((item) => item.userId === userId);

    if (rateExists) {
      return res.status(403).json({ message: "Rate for this movie already submitted" });
    }

    if (!rateExists) {
      rateValues.push({ rate, userId });
    }

    const calculateRateAverage = () => {
      let total = 0;
      rateValues.forEach((rate) => {
        total += rate.rate;
      });
      return (total / rateValues.length).toFixed(1);
    };

    const newAverageRate = calculateRateAverage();

    await Movie.findOneAndUpdate(
      { _id: id },
      { rateList: rateValues, averageRate: newAverageRate },
      { new: true }
    );

    res.status(200).json({ message: "Rate submitted" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/", (req, res, next) => {
  const { title, synopsis, cover, averageRate } = req.body;
  Movie.create({ title, synopsis, cover, averageRate })
    .then((movie) => res.status(200).json(movie))
    .catch((error) => console.error(error));
});

module.exports = router;
