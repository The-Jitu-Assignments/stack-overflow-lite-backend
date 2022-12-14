const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const sqlConfig = require('../../config/index');
const { SECRET_KEY } = process.env;
const dotenv = require('dotenv').config();

const DbConnect = require('../../helpers/dbHelper');

const { DbConnection } = DbConnect;

const { execute } = new DbConnection();

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; 
    const id = v4();
    
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: 'Please provide all details'
      })
    };

    const user = await (await execute('usp_getUser', { email })).recordset[0];

    if (user) {
      return res.status(400).json({
        msg: 'user already exists'
      })
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
  
      await execute('usp_signup', { id, name, email, password: hashedPassword });
  
      return res.status(200).json({
        msg: 'User created successfully'
      })
    }
    
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

    const user = await (await execute('usp_getUser', { email })).recordset[0];

    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if(checkPassword) {
        const { password, id, ...payload } = user;
        const token = jwt.sign({ currentUser: id, ...payload }, SECRET_KEY, { expiresIn: '24h' });
        return res.status(200).json({
          msg: 'User logged in successfully',
          token
        })
      } else {
        return res.status(400).json({ msg: 'The data provided seems to be incorrect' });
      }
    } else {
      return res.status(404).json({ msg: 'User with that email does not exist' });
    }

  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};