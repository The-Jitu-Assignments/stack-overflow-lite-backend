const sql = require('mssql');
const sqlConfig = require('../../config');
const { v4 } = require('uuid');

const DbConnect = require('../../helpers/dbHelper');

const { DbConnection } = DbConnect;

const { execute } = new DbConnection();

exports.createQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const { currentUser } = req.user;

    const id = v4();

    await execute('usp_createOrUpdateQuestion', { id, userId: currentUser, question });

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
    const questions = await (await execute('usp_getAllQuestions')).recordset;

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

    const question = await (await execute('usp_getQuestion', { id })).recordset[0];

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
    const { id } = req.params;

    const { currentUser } = req.user;

    const question = await (await execute('usp_getQuestion', { id })).recordset[0];

    if (question) {
      const { userId } = question;
      if (currentUser !== userId) {
        return res.status(401).json({
          msg: 'Not allowed to delete the question'
        })
      } else {
        await execute('usp_deleteAQuestion', { id });

        return res.status(200).json({
          msg: 'Question deleted successfully'
        });
      }
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

exports.getMyQuestions = async (req, res) => {
  try {
    const { currentUser } = req.user;

    const pool = await sql.connect(sqlConfig);

    // const questions = await (await pool.request()
    //   .input('userId', currentUser)
    // .execute('usp_findMyQuestions')).recordset;

    const questions = await (await execute('usp_findMyQuestions', { userId: currentUser })).recordset;

    if (questions.length > 0) {
      return res.status(200).json({
        msg: 'Questions fetched successfully',
        data: questions
      })
    } else {
      return res.status(404).json({
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};

exports.findQuestions = async (req, res) => {
  try {
    const { value } = req.query;

    const pool = await sql.connect(sqlConfig);

    const questions = await (await pool.request().input('value', value).execute('usp_searchQuestion')).recordset

    if (questions.length > 0) {
      return res.status(200).json({
        data: questions
      })
    } else {
      return res.status(404).json({
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};

exports.getMostAnsweredQn = async (req, res) => {
  try {
    const { range } = req.query; 

    const pool = await sql.connect(sqlConfig);

    const questions = await (await pool.request().input('range', range).execute('usp_mostAnsweredQuestion')).recordset;

    if (questions.length > 0) {
      return res.status(200).json({
        msg: 'Questions fetched successfully',
        data: questions
      })
    } else {
      return res.status(404).json({
        msg: 'Your range is too high',
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}