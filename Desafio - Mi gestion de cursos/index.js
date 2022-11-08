const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
const { getCursos, nuevoCurso, editarCurso, eliminarCurso } = require("./consultas");


const puerto = process.env.PUERTO || 3000;
const servidor = process.env.HOST || 'localhost';

app.listen(puerto, () => {
    console.info(`Servidor disponible en http://${servidor}:${puerto}`);
    });

    app.get("/", (req, res) => {
        res.sendFile(__dirname + '/index.html')
    });

    app.get("/cursos", async (req, res) => {
        const respuesta = await getCursos();
        res.send(respuesta);
        });

    app.post("/curso", async (req, res) => {
        const curso = req.body;
        const respuesta = await nuevoCurso(curso);
        res.send(respuesta);
        });

    app.put("/curso", async (req, res) => {
        const curso = req.body;
        const respuesta = await editarCurso(curso.id, curso);
        res.send(respuesta);
        });

    app.delete("/cursos/:id", async (req, res) => {
        const { id } = req.params;
        const respuesta = await eliminarCurso(id);
        respuesta > 0
        ? res.send(`El curso de ${id} fue eliminado con éxito`)
        : res.send("No existe un curso registrado con ese nombre");
        });