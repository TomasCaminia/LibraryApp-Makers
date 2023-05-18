// ! Importar las dependencias
const express = require("express");
const router = express.Router();

// ! Importar los controladores correspondientes
const usersController = require("../controllers/usersController.js");
const bookController = require("../controllers/bookController.js");
const reviewController = require("../controllers/reviewController.js");

// ! Rutas para usuarios
router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);
router.put("/update", usersController.updateUser);
router.delete("/delete", usersController.deleteUser);

// ! Rutas para reseñas de libros
router.get("/books/:bookId/reviews", reviewController.getBookReviews);
router.post("/books/:bookId/reviews", reviewController.saveBookReview);
router.get("/reviews", reviewController.getAllReviews);

// ! Ruta para obtener todos los libros de la API
router.get("/books", bookController.getBooks);

// ! Ruta para buscar libros en la API
router.get("/search", bookController.searchBooks);

module.exports = router;
