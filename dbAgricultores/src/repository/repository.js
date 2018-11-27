const mongodb = require("../config/mongodb");



function getAllAgricultores(callback) {
    mongodb.connect(function (err, db) {
        db.collection("agricultores").find().toArray(callback);
        console.log("teste do rolê")
    });
}


function setNovoAgricultor(login1,nome1,contato1,psw1,callback) {
    mongodb.connect(function(err,db) {
        if (err) return callback(err)
        db.collection("agricultores").insertOne({"login":login1,"password":psw1,"nome":nome1,"contato":contato1},callback);
    })
}


function getAgricultorById(id, callback) {
    mongodb.connect(function (err, db) {
        db.collection("agricultores").findOne({_id:require("mongodb").ObjectId(id)},callback);
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


function disconnect() {
    return mongodb.disconnect();
}
module.exports = {disconnect, getAgricultorById, getAllAgricultores, getPlanejamento,setNovoAgricultor,getLoginAgricultor}