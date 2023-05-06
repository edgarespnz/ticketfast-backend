const { Pool } = require('pg');

//aquí se definen los datos de acceso de la database para hacer las consultas.
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'ticketfast',
    port: '5432'
})

//enpoint para obtener todas las anp
const getAnp = async (req, res) => {
    const response = await pool.query('select * from anp');
    res.status(200).json(response.rows)
}


//enpoint para obtener todos los usuarios
const getUsers = async (req, res) => {
    const response = await pool.query('select * from "user"');
    res.status(200).json(response.rows)
}

//creamos nuevo usuario
const createUser = async (req, res) => {
    const { name, last_name, email, password } = req.body;
    try {
        const response = await pool.query('INSERT INTO "user"(name, last_name, email,password) VALUES ($1, $2, $3, $4)', [name, last_name, email, password])
        console.log(response);
        res.json({
            message: 'User succesfully created',
            body: {
                user: {name, last_name, email, password}
            }
        })
    } catch (e) {
        console.error(e);
        res.status(500).send('Error creating user');
    }
}

const verifyUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // buscar usuario por correo electrónico y contraseña
      const response = await pool.query('SELECT * FROM "user" WHERE email = $1 AND password = $2', [email, password]);
  
      if (response.rows.length > 0) {
        res.json({
          message: 'User exists and password is correct',
          body: {
            user: response.rows[0]
          }
        });
      } else {
        res.status(404).json({
          message: 'User does not exist or password is incorrect'
        });
      }
  
    } catch (e) {
      console.error(e);
      res.status(500).send('Error verifying user');
    }
  };

module.exports = {
    getAnp,
    createUser,
    getUsers,
    verifyUser
}