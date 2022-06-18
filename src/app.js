import express from "express";

const app = express();

const estudiantes = [];
const asignaciones = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("201909103 - William Alejandro Borrayo Alarcón");
});

app.post("/registrar", (req, res) => {
  const { id, nombre, apellido, correo,
    nacimiento, contrasenia, confirmacion } = req.body;

  if (!id || !nombre || !apellido || !correo
    || !nacimiento || !contrasenia || !confirmacion) {
    return res.status(400).json('Faltan datos');
  }

  if (contrasenia != confirmacion) {
    return res.status(400).json('Contraseñas no coinciden');
  }

  estudiantes.forEach(estudiante => {
    if (estudiante.id == id || estudiante.correo == correo) {
      return res.status(400).json('Datos ya usados');
    }
  });

  const nuevoUsuario = { ...req.body };
  estudiantes.push(nuevoUsuario);
  res.status(200).json('Registrado');
});

app.post("/iniciarSesion", (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    res.status(400).json('Faltan datos');
  }

  estudiantes.forEach(estudiante => {
    if (estudiante.correo == correo && estudiante.contrasenia == contrasenia) {
      res.status(200).json('Bienvenido');
    }
  });

  res.status(400).json('No encontrado');
});

app.post("/asignar", (req, res) => {
  const { id, idEstudiante, curso, seccion, dia, hora } = req.body;
  console.log(asignaciones);
  if (!id || !idEstudiante || !curso || !seccion || !dia || !hora) {
    return res.status(400).json('Faltan datos');
  }

  asignaciones.forEach(asignacion => {
    if (asignacion.id == id) {
      return res.status(400).json('id repetido');
    }
  });

  estudiantes.forEach(estudiante => {
    if (estudiante.id == idEstudiante) {
      const asignacion = { ...req.body };
      asignaciones.push(asignacion);
      return res.status(200).json('Asignado');
    }
  });

  res.status(400).json('Estudiante no existe');

});

export default app;
