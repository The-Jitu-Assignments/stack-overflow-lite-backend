const { v4 } = require('uuid');
const sql = require('mssql');
const sqlConfig = require('../../config');

exports.addAnswer = async (req, res) => {
  try {
    const { questionId, comment } = req.body;
    const { currentUser } = req.user;

    const pool = await sql.connect(sqlConfig);

    await pool.request()
      .input('id', v4())
      .input('userId', currentUser)
      .input('questionId', questionId)
      .input('comment', comment)
    .execute('usp_createOrUpdateAnswer');

    return res.status(201).json({
      msg: 'Answer added successfully'
    })
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};