const { v4 } = require('uuid');

const DbConnect = require('../../helpers/dbHelper');

const { DbConnection } = DbConnect;

const { execute } = new DbConnection();

exports.addAnswer = async (req, res) => {
  try {
    const { questionId, comment } = req.body;
    const { currentUser } = req.user;
    const id = v4();

    await execute('usp_createOrUpdateAnswer', { id, userId: currentUser, questionId, comment});

    return res.status(201).json({
      msg: 'Answer added successfully'
    })
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentUser } = req.user;

    const { questionId, comment, accepted, isLiked } = req.body;

    await execute('usp_createOrUpdateAnswer', 
      { id, userId: currentUser, questionId, comment, accepted, isLiked }
    );

    return res.status(200).json({
      msg: 'Answer Updated successfully'
    })
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}