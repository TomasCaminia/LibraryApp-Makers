const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../data/app.db");

const usersController = {
  // Registro de usuarios
  registerUser: (req, res) => {
    const { name, email, password } = req.body;

    const insertQuery =
      "INSERT INTO Users (Name, Mail, Password) VALUES (?, ?, ?)";
    const values = [name, email, password];

    db.run(insertQuery, values, function (err) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error al registrar el usuario" });
      }
      return res
        .status(201)
        .json({ message: "Usuario registrado exitosamente" });
    });
  },

  // Inicio de sesión de usuarios
  loginUser: (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM Users WHERE Mail = ? AND Password = ?";
    const values = [email, password];

    db.get(query, values, function (err, row) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error en el servidor" });
      }

      if (!row) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      return res.status(200).json({ message: "Inicio de sesión exitoso" });
    });
  },

  // Actualización de información de usuarios
  updateUser: (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const updateQuery =
      "UPDATE Users SET Name = ?, Mail = ?, Password = ? WHERE ID = ?";
    const values = [name, email, password, userId];

    db.run(updateQuery, values, function (err) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error al actualizar el usuario" });
      }
      return res
        .status(200)
        .json({ message: "Usuario actualizado exitosamente" });
    });
  },

  // Eliminación de usuarios
  deleteUser: (req, res) => {
    const userId = req.params.id;

    const deleteQuery = "DELETE FROM Users WHERE ID = ?";

    db.run(deleteQuery, userId, function (err) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error al eliminar el usuario" });
      }
      return res
        .status(200)
        .json({ message: "Usuario eliminado exitosamente" });
    });
  },
};

module.exports = usersController;
