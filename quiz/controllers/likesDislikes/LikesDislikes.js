const { v4 } = require('uuid');

const DbConnect = require('../../helpers/dbHelper');

const { DbConnection } = DbConnect;

const { execute } = new DbConnection();

exports.updateLikeDislike = async (req, res) => {
  try {
    const { answerId, total } = req.body;
    const { currentUser } = req.user;

    const id = v4();

    await execute('usp_likeDislike', { id, userId: currentUser, answerId, total });

    if (total === 1) {
      return res.status(201).json({
        msg: 'Like added successfully'
      })
    } else {
      return res.status(201).json({
        msg: 'Dislike added successfully'
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};
