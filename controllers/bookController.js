const axios = require("axios");

const API_KEY = "AIzaSyASaF2U5v0kxe7nyO25tp6XCfzYlN3yn38";

// Obtener todos los libros de la API
exports.getBooks = async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}`
    );

    const books = response.data.items.map((item) => {
      const bookData = item.volumeInfo;
      return {
        id: item.id,
        title: bookData.title,
        authors: bookData.authors,
        description: bookData.description,
      };
    });

    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

// Buscar libros en la API
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&key=${API_KEY}`
    );

    const books = response.data.items.map((item) => {
      const bookData = item.volumeInfo;
      return {
        id: item.id,
        title: bookData.title,
        authors: bookData.authors,
        description: bookData.description,
      };
    });

    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar los libros" });
  }
};
