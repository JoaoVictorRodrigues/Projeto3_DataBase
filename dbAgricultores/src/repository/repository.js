const mongodb = require("../config/mongodb");



function getAllAgricultores(callback) {
    mongodb.connect(function (err, db) {
        db.collection("agricultores").find().toArray(callback);
        console.log("teste do rolê")
    });
}

function getAllAgricultoresNames(callback) {
    mongodb.connect(function(err,db) {
        db.collection("agricultores").find().toArray(callback);
    });
}

function getAgricultorById(id, callback) {
    mongodb.connect(function (err, db) {
        db.collection("agricultores").findOne({_id:require("mongodb").ObjectId(id)},callback);
    });
}

function getPlanejamento(id,callback){
    mongodb.connect(function(err,db) {
        db.collection("planejamento").findOne({id_agricultor:require("mongodb").ObjectId(id)},callback);
    });
}

function disconnect() {
    return mongodb.disconnect();
}

function getAllCultivos(callback) {
    mongodb.connect(function (err, db) {
        db.collection("cultivos").find().toArray(callback);
        console.log("teste do alê")
    });
}

function getCultivoByName(callback) {
    mongodb.connect(function (err, db) {
      db.collection("cultivos").findOne({cultivo:require("mongodb").objectId(id)},callback);
    });
}

module.exports = {disconnect, getAgricultorById, getAllAgricultores, getAllAgricultoresNames, getPlanejamento, getAllCultivos, getCultivoByName}
