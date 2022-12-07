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
    const questions = await (await pool.request().execute('usp_getAllQuestions')).recordset;

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

exports.getQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await sql.connect(sqlConfig);

    const question = await 
      (
        await pool.request()
          .input('id', id)
        .execute('usp_getQuestion')
      ).recordset[0];

      if (question) {
        return res.status(200).json({
          data: question
        })
      } else {
        return res.status(404).json({
          msg: `Question with an id of ${id} is not found`
        })
      };
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const { id } = req.user;

    const pool = await sql.connect(sqlConfig);

    console.log(pool);

    const question = await (await pool.request().input('id', questionId).execute('usp_getQuestion')).recordset[0];

    const { userId } = question;

    if (id !== userId) {
      return res.status(401).json({
        msg: 'Not allowed to delete the question'
      })
    };

    if (question) {
      await pool.request().input('id', id).execute('usp_deleteAQuestion');

      return res.status(200).json({
        msg: 'Question deleted successfully'
      })
    } else {
      return res.status(404).json({
        msg: `Question with an id of ${id} is not found`
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}