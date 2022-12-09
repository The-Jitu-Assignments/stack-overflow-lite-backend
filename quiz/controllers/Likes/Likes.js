// const sql = require('mssql');
// const sqlConfig = require('../../config');
// const { v4 } = require('uuid');

// exports.addLike = async (req, res) => {
//   try {
//     const { answerId, likes } = req.body;
//     const { currentUser } = req.info;

//     const pool = await sql.connect(sqlConfig);

//     await pool.request()
//       .input('id', v4())
//       .input('answerId', answerId)
//       .input('userId', currentUser)
//       .input('likes', likes)
//     .execute('')
//   } catch (error) {
    
//   }
// }