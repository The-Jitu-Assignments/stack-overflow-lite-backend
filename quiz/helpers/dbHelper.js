const sql = require('mssql');
const sqlConfig = require('../config');

class DbConnection {
  constructor() {
    this.pool = this.connectToDb()
  }

  connectToDb = async () => {
    try {
      const pool = await sql.connect(sqlConfig);
      return pool;
    } catch (error) {
      return error.message;
      // throw new Error(error.message);
    }
  }

  createRequest = (request, data) => {
    try {
      const keys = Object.keys(data)

      keys.map(key => {
        const keyValue = data[key]
        request.input(key, keyValue)
      })

      return request;
    } catch (error) {
      return error.message;
    }
  }

  execute = async (proc, data = {}) => {
    try {
      let request = await (await this.pool).request();
      request = this.createRequest(request, data);
      const results = await request.execute(proc);
      return results;
    } catch (error) {
      return error.message;
    }
  }

  query = async (query) => {
    const results = await (await this.pool).request().query(query);
    return results;
  }
}

exports.DbConnection = DbConnection;