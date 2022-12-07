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
};

exports.getQuestions = async (req, res) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const questions = await pool.request().execute('usp_getAllQuestions');

    if (questions.length > 0) {
      return res.status(200).json({
        msg: 'Questions Fetched successfully',
        data: questions
      })
    } else {
      return res.status(404).json({
        msg: 'Currently their are no questions',
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}