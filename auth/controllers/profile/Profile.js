const { v4 } = require('uuid');

const DbConnect = require('../../helpers/dbHelper');
const { DbConnection } = DbConnect;
const { execute } = new DbConnection();

exports.createProfile = async (req, res) => {
  try {
    const id = v4();
    const { currentUser } = req.user;
    const { phone, address, github, imgUrl } = req.body;

    await execute('usp_createOrUpdateProfile', { id, userId: currentUser, phone, address, github, imgUrl });

    return res.status(201).json({
      msg: 'Profile created successfully'
    })
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}