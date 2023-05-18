const Review = require("../models/review");

// Obtener reseñas de un libro por su ID
exports.getBookReviews = (req, res) => {
  const { bookId } = req.params;

  Review.getReviewsByBookId(bookId, (err, reviews) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error al obtener las reseñas del libro" });
    }

    res.status(200).json({ reviews });
  });
};

// Guardar una nueva reseña para un libro
exports.saveBookReview = (req, res) => {
  const { bookId, userId, content, punctuation } = req.body;
  const date = new Date().toISOString().split("T")[0]; // Obtener la fecha actual

  const review = new Review(bookId, userId, content, punctuation, date);

  review.save((err, savedReview) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error al guardar la reseña del libro" });
    }

    res.status(200).json({ review: savedReview });
  });
};

// Obtener todas las reseñas
exports.getAllReviews = (req, res) => {
  Review.getAllReviews((err, reviews) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener las reseñas" });
    }

    res.status(200).json({ reviews });
  });
};
