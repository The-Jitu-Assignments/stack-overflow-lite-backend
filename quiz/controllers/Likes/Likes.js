const sql = require('mssql');
const sqlConfig = require('../../config');
const { v4 } = require('uuid');

exports.addLike = async (req, res) => {
  try {
    const { answerId, total } = req.body;
    const { currentUser } = req.user;

    const pool = await sql.connect(sqlConfig);

    await pool.request()
      .input('id', v4())
      .input('answerId', answerId)
      .input('userId', currentUser)
      .input('total', total)
    .execute('usp_likeDislike');

    return res.status(201).json({
      msg: 'Like added successfully'
    })
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}