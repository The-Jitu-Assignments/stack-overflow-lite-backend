const sql = require('mssql');
const { v4 } = require('uuid');
const sqlConfig = require('../../config');

exports.addComment = async (req, res) =>  {
  try {
    const { answerId, comment } = req.body;

    const { currentUser } = req.user;

    const pool = await sql.connect(sqlConfig);

    await pool.request()
      .input('id', v4())
      .input('userId', currentUser)
      .input('answerId', answerId)
      .input('comment', comment)
    .execute('usp_createOrUpdateComment');

    return res.status(201).json({
      msg: 'Comment updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};