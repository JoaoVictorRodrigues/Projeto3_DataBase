require("dotenv-safe").load();
const agricultores = require('./api/agricultores');
const server = require("./server/server");
const repository = require("./repository/repository");
 
server.start(agricultores, repository, (err, app) => { 
    console.log("just started");
});