const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../data/app.db");

class Review {
  constructor(bookId, userId, content, punctuation) {
    this.bookId = bookId;
    this.userId = userId;
    this.content = content;
    this.punctuation = punctuation;
    this.date = new Date().toISOString().split("T")[0];
  }

  static getReviewsByBookId(bookId, callback) {
    const query = "SELECT * FROM Reviews WHERE bookId = ?";
    const values = [bookId];

    db.all(query, values, (err, rows) => {
      if (err) {
        console.error(err);
        return callback(err);
      }

      const reviews = rows.map((row) => {
        const { bookId, userId, content, punctuation, date } = row;
        return new Review(bookId, userId, content, punctuation, date);
      });

      return callback(null, reviews);
    });
  }

  save(callback) {
    const query =
      "INSERT INTO Review (bookId, userId, content, punctuation, date) VALUES (?, ?, ?, ?, ?)";
    const values = [
      this.bookId,
      this.userId,
      this.content,
      this.punctuation,
      this.date,
    ];

    db.run(query, values, function (err) {
      if (err) {
        console.error(err);
        return callback(err);
      }

      return callback(null, this);
    });
  }

  static getReviewsByUserId(userId, callback) {
    const query = "SELECT * FROM Review WHERE userId = ?";
    const values = [userId];

    db.all(query, values, (err, rows) => {
      if (err) {
        console.error(err);
        return callback(err);
      }

      const reviews = rows.map((row) => {
        const { bookId, userId, content, punctuation, date } = row;
        return new Review(bookId, userId, content, punctuation, date);
      });

      return callback(null, reviews);
    });
  }

  static getAllReviews(callback) {
    const query = "SELECT * FROM Review";

    db.all(query, (err, rows) => {
      if (err) {
        console.error(err);
        return callback(err);
      }

      const reviews = rows.map((row) => {
        const { bookId, userId, content, punctuation, date } = row;
        return new Review(bookId, userId, content, punctuation, date);
      });

      return callback(null, reviews);
    });
  }

  static getReviewsByBookAndUserId(bookId, userId, callback) {
    const query = "SELECT * FROM Review WHERE bookId = ? AND userId = ?";
    const values = [bookId, userId];

    db.all(query, values, (err, rows) => {
      if (err) {
        console.error(err);
        return callback(err);
      }

      const reviews = rows.map((row) => {
        const { bookId, userId, content, punctuation, date } = row;
        return new Review(bookId, userId, content, punctuation, date);
      });

      return callback(null, reviews);
    });
  }
}

module.exports = Review;
