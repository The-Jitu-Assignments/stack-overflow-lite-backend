const { v4 } = require('uuid');

const DbConnect = require('../../helpers/dbHelper');

const { DbConnection } = DbConnect;

const { execute } = new DbConnection();

exports.addComment = async (req, res) =>  {
  try {
    const { answerId, comment } = req.body;
    const { currentUser } = req.user;
    const id = v4();

    if (!comment) {
      return res.status(400).json({
        msg: 'You cannot add an empty comment'
      })
    }

    await execute('usp_createOrUpdateComment', { id, userId: currentUser, answerId, comment });

    return res.status(201).json({
      msg: 'Comment added successfully'
    });
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};