// Importar las dependencias
const express = require("express");
const app = express();
const port = 3000;

// Importar las dependencias de SQLite
const sqlite3 = require("sqlite3").verbose();

// Crear una instancia de la base de datos
const db = new sqlite3.Database("./data/app.db", (error) => {
  if (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  } else {
    console.log("Conexión exitosa con la base de datos");
  }
});

// Configurar el middleware de análisis de cuerpo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar las rutas
const apiRoutes = require("./routes/api");

// Conectar las rutas
app.use("/api", apiRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
