import request from "supertest";
import app from "../src/app";

describe("POST /registrar", () => {
  const estudiante = {
    id: 1,
    nombre: "William",
    apellido: "Borrayo",
    correo: "wiliamborrayo@gmail.com",
    nacimiento: "19/10/2001",
    contrasenia: "1234",
    confirmacion: "1234"
  }

  test("deberia responder con 200, porque está bien", async () => {
    const response = await request(app).post("/registrar").send(estudiante);
    expect(response.statusCode).toBe(200);
  });

  test("deberia responder con 400, porque ya se registró", async () => {
    const repetido = estudiante;

    const response = await request(app).post("/registrar").send(repetido);
    expect(response.statusCode).toBe(400);
  });

  test("deberia indicar que no coinciden las contraseñas", async () => {
    const incorrecto = {
      ...estudiante,
      id: 2,
      confirmacion: "abcde"
    }

    const response = await request(app).post("/registrar").send(incorrecto);
    expect(response.text).toBe("\"Contraseñas no coinciden\"");
  });

});

describe("POST /iniciarSesion", () => {
  const inicioSesion = {
    correo: "wiliamborrayo@gmail.com",
    contrasenia: "1234"
  }

  test("deberia responder con 200, porque está bien", async () => {
    const response = await request(app).post("/iniciarSesion").send(inicioSesion);
    expect(response.statusCode).toBe(200);
  });

  test("deberia indicar que faltan datos", async () => {
    const incompleto = {
      ...inicioSesion,
      contrasenia: ""
    }

    const response = await request(app).post("/iniciarSesion").send(incompleto);
    expect(response.text).toBe("\"Faltan datos\"");
  });


  test("deberia responder con 400, porque las credenciales están mal", async () => {
    const incorrecto = {
      ...inicioSesion,
      contrasenia: "4567"
    }

    const response = await request(app).post("/iniciarSesion").send(incorrecto);
    expect(response.statusCode).toBe(400);
  });

});

describe("POST /asignar", () => {
  const asignacion = {
    id: 1,
    idEstudiante: 1,
    curso: "AyD1",
    seccion: "N",
    dia: "Lunes",
    hora: "11:00"
  }

  test("deberia responder con 200, porque está bien", async () => {
    const response = await request(app).post("/asignar").send(asignacion);
    expect(response.statusCode).toBe(200);
  });

  test("deberia indicar que no existe ese estudiante", async () => {
    const noExiste = {
      ...asignacion,
      id: 2,
      idEstudiante: 8
    }
    
    const response = await request(app).post("/asignar").send(noExiste);
    expect(response.text).toBe("\"Estudiante no existe\"");
  });


  test("deberia responder con 400, porque se repite la asignacion", async () => {
    const repetido = asignacion

    const response = await request(app).post("/asignar").send(repetido);
    expect(response.statusCode).toBe(400);
  });

});
