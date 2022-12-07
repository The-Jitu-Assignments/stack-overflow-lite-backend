const sql = require('mssql');
const sqlConfig = require('../../config');
const { v4 } = require('uuid');

exports.createQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const { id } = req.user;

    const pool = await sql.connect(sqlConfig);

    await pool.request()
      .input('id', v4())
      .input('userId', id)
      .input('question', question)
    .execute('usp_createOrUpdateQuestion');

    return res.status(201).json({
      msg: 'Question Created Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}