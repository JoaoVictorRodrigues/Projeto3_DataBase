const MongoClient = require("mongodb").MongoClient;
var connection = null;
var db = null;
function connect(callback) {
  if (connection) return callback(null, db);
  MongoClient.connect(process.env.MONGO_CONNECTION,{ useNewUrlParser:true}, function(err, conn){
    if (err){
      console.log("Algo deu errado ao conectar com o mongodb");
      return callback(err, null);
    }else {
      console.log("Conectado ao mongodb");
      connection = conn;
      db = conn.db(process.env.DATABASE_NAME);
      return callback(null, db);
    }
  })
}
function disconnect() {
  if (!connection) return true;
  connection.close();
  connection = null;
  return true;
}
module.exports = { connect, disconnect }
