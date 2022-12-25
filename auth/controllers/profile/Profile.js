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
};

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await (await execute('usp_getUserProfile', { userId })).recordset[0];

    if (profile) {
      return res.status(200).json({
        msg: 'Fetched profile successfully',
        data: profile
      })
    } else {
      return res.status(404).json({
        msg: `User with an id of ${userId} is not found`,
        data: []
      })
    }

  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}