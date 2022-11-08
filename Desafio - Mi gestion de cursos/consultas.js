const { Pool } = require("pg");

const pool_conexion = new Pool ({
user: "postgres",
host: "localhost",
password: "xxxxxx",
database: "cursos",
port: 5432,
});

async function getCursos() {
    try {
      const result = await pool_conexion.query(`SELECT * FROM cursos`);
      return result.rows;
    } catch (e) {
      return e;
    }
  }

    async function nuevoCurso(curso) {
        try {
          const result = await pool_conexion.query(
            `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ('${curso.nombre}',${Number(curso.nivelTecnico)},'${curso.fechaInicio}',${Number(curso.duracion)} ) RETURNING *`
          );
          return result.rows
        } catch (e) {
          return e;
        }
      }
      

      async function editarCurso(id, nuevocurso) {
        try {
          const res = await pool_conexion.query(
            `UPDATE cursos SET nombre = '${nuevocurso.nombre}', nivel=${Number(nuevocurso.nivelTecnico)}, fecha=TO_DATE('${nuevocurso.fechaInicio}','YYYYMMDD'),
            duracion=${Number(nuevocurso.duracion)} WHERE id = '${id}'
          RETURNING *`
          );
          return res.rows;
        } catch (e) {
          console.log(e);
        }
      }

      async function eliminarCurso(id) {
        console.log(id)
        try {
          const result = await pool_conexion.query(`DELETE FROM cursos WHERE id = '${id}'`);
          return result.rowCount;
        } catch (e) {
          return e;
        }
      }
      

module.exports = { getCursos, nuevoCurso, editarCurso, eliminarCurso};
