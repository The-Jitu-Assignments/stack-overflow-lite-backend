const DbConnect = require('../../helpers/dbHelper');
const { getDays } = require('../../helpers/getDays');
const { v4 } = require('uuid');
const { DbConnection } = DbConnect;
const { execute } = new DbConnection();

// console.log(getDays)

exports.createQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const { currentUser } = req.user;

    const id = v4();

    if (!question) {
      return res.status(400).json({
        msg: 'You cannot post an empty question'
      })
    }

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

    let newData = getDays(questions);

    if (questions.length > 0) {
      return res.status(200).json({
        msg: 'Questions Fetched successfully',
        data: newData
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

    const answers = await (await execute('usp_getAnswersOfAQuiz', { questionId: id })).recordset;

    let newData = getDays(answers);

    if (question) {
      return res.status(200).json({
        data: {
          question: question,
          answers: newData
        }
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

    const questions = await (await execute('usp_searchQuestion', { value })).recordset;

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

    const questions = await (await execute('usp_mostAnsweredQuestion', { range })).recordset;

    
    if (questions.length > 0) {
      let qnFilter = questions.map(qn => { return qn.id });

      const allQuestions = await (await execute('usp_getAllQuestions')).recordset;

      const filteredData = allQuestions.filter(question => qnFilter.includes(question.id));

      return res.status(200).json({
        msg: 'Questions fetched successfully',
        data: filteredData
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
};

exports.getRecentQuestions = async (req, res) => {
  try {
    const questions = await (await execute('usp_getMostRecentQuizes')).recordset;

    if (questions) {
      return res.status(200).json({
        msg: 'Questions fetched successfully',
        data: questions
      })
    } else {
      return res.status(404).json({
        msg: 'Not questions were found'
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}