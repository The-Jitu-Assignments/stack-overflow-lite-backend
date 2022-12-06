const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const sql = require('mssql');
const sqlConfig = require('../../config/index');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; 
    
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: 'Please provide all details'
      })
    };
    
    const hashedPassword = await bcrypt.hash(password, 8);

    const pool = await sql.connect(sqlConfig);

    await pool.request()
      .input('id', v4())
      .input('name', name)
      .input('email', email)
      .input('password', hashedPassword)
    .execute('usp_signup');

    return res.status(200).json({
      msg: 'User created successfully'
    })
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please Provide all details' })
    }
    const pool = await sql.connect(sqlConfig);

  } catch (error) {
    
  }
};