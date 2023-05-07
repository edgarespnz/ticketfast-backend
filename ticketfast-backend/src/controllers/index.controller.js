const { Pool } = require('pg');
const transporter = require('../config/mailer')

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
        user: { name, last_name, email, password }
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

//obtener anp por id
const getAnpById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await pool.query('SELECT * FROM anp WHERE id = $1', [id]);
    if (response.rows.length > 0) {
      res.status(200).json(response.rows[0]);
    } else {
      res.status(404).send(`ANP with id ${id} not found`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('Error getting ANP by id');
  }
}

//enviar correo electrónico
//rvkilatostmeabyy
const sendEmail = async (req, res) => {
  const { to, subject, body } = req.body;

  const mailOptions = {
    from: 'edgar.esp.carrion@gmail.com',
    to,
    subject,
    html: `
        <p>Hola!${body.userName}</p>
        <p>El número de orden es: ${body.orderNumber}</p>
        <p>El precio total es: ${body.totalPrice}</p>
        <p>La cantidad de tickets es: ${body.ticketCount}</p>
      `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (e) {
    console.error(e);
    res.status(500).send('Error sending email');
  }
};


module.exports = {
  getAnp,
  createUser,
  getUsers,
  verifyUser,
  getAnpById,
  sendEmail
  
}