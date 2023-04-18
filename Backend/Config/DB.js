var mysql = require('mysql2/promise')

//factory function
function DB(){
  let connection;

  async function createConnection(){
    console.log("here")
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'admin',
      database: 'eventhive',
    })
  }

  function getConnection(){
    return connection;
  }

  return {getConnection, createConnection}
}

const db = DB();

db.createConnection();

module.exports = db;

// module.exports.connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'admin',
//   database: 'eventhive',
// })
