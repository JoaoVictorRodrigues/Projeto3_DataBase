const mongodb = require("../config/mongodb");



function getAllAgricultores(callback) {
    mongodb.connect(function (err, db) {
        db.collection("agricultores").find().toArray(callback);
        console.log("teste do rolê")
    });
}


function setNovoAgricultor(_login,_nome,_contato,_password,callback) {
    mongodb.connect(function(err,db) {
        if (err) return callback(err)
        db.collection("agricultores").insertOne({login:_login,password:_password,nome:_nome,contato:_contato},callback);

    })
}
function getAllCultivos(callback) {
    mongodb.connect(function (err, db) {
        db.collection("cultivos").find().toArray(callback);
        console.log("teste do alê")
    });
}

function getCultivoByName(_cultivo, callback) {
    mongodb.connect(function (err, db) {
      db.collection("cultivos").findOne({cultivo:_cultivo},callback);
    });
}


function getAgricultorByLogin(_login, callback) {
    mongodb.connect(function (err, db) {
        db.collection("agricultores").find({"login":_login}).toArray(callback);
    });
}

function getPlanejamento(id,callback){
    mongodb.connect(function(err,db) {
        console.log("HUE")
        db.collection("planejamento").findOne({id_agricultor:require("mongodb").ObjectId(id)},callback);
    });
}

function getLoginAgricultor(_login,callback){
    mongodb.connect(function(err,db){
        db.collection("agricultores").find({login:_login}).toArray(callback)
        
    })
}

function changeInfoByLogin(_login,_password,_nome,_contato,callback) {
    mongodb.connect(function(err,db){
        db.collection("agricultores").updateOne({login:_login},{$set:{password:_password,nome:_nome,contato:_contato}},callback)
    })
}


function disconnect() {
    return mongodb.disconnect();
}
module.exports = {disconnect, getAgricultorByLogin, getAllAgricultores, getPlanejamento,setNovoAgricultor,getLoginAgricultor,changeInfoByLogin,getCultivoByName, getAllCultivos}