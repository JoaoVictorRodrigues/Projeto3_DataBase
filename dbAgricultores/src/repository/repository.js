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

function addAlimento(_cultivo,_muda_ou_semente,_dias_no_canteiro,_iniciar_colheita_em,_finalizar_colheitas_em,_Classificacao_nutricional,callback){
    mongodb.connect(function(err, db){
        db.collection("cultivos").insertOne({cultivo:_cultivo,muda_ou_semente:_muda_ou_semente,dias_no_canteiro:_dias_no_canteiro,iniciar_colheita_em:_iniciar_colheita_em,finalizar_colheitas_em:_finalizar_colheitas_em,Classificacao_nutricional:_Classificacao_nutricional}, callback)
    })
}

function editAlimento(_cultivo,_muda_ou_semente,_dias_no_canteiro,_iniciar_colheita_em,_finalizar_colheitas_em,_Classificacao_nutricional,callback){
    mongodb.connect(function(err, db){
        db.collection("cultivos").updateOne({cultivo:_cultivo},{$set:{muda_ou_semente:_muda_ou_semente,dias_no_canteiro:_dias_no_canteiro,iniciar_colheita_em:_iniciar_colheita_em,finalizar_colheitas_em:_finalizar_colheitas_em,Classificacao_nutricional:_Classificacao_nutricional}}, callback)
    })
}

function planejamentosAgricultor(_login,callback){
    mongodb.connect(function(err, db){
        db.collection("planejamento").find({loginAgricultor:_login}).toArray(callback)
    })
}
function planejamentoById(id,callback){
    console.log("oito oito")
    mongodb.connect(function(err,db){
        console.log("nove nove")
        db.collection("planejamento").find({_id:require("mongodb").ObjectID(id)}).toArray(callback);
    })
}

function novoPlanejamento(_loginAgricultor,_nomeCultivo,_canteiros,_dataSemeadura,_quantPlanejada,_unidadePlanejada,_quantPlantada,_unidadePlantada,_quantSobreviveu,_unidadeSobreviveu,_emAndamento,callback){
    mongodb.connect(function(err, db){
        db.collection("planejamento").insertOne({loginAgricultor:_loginAgricultor,nomeCultivo:_nomeCultivo,canteiros:_canteiros,dataSemeadura:_dataSemeadura,quantPlanejada:_quantPlanejada,unidadePlanejada:_unidadePlanejada,quantPlantada:_quantPlantada,unidadePlantada:_unidadePlantada,quantSobreviveu:_quantSobreviveu,unidadeSobreviveu:_unidadeSobreviveu,emAndamento:_emAndamento},callback);
    })
}

function alteraPlanejamento(id,_loginAgricultor,_nomeCultivo,_canteiros,_dataSemeadura,_quantPlanejada,_unidadePlanejada,_quantPlantada,_unidadePlantada,_quantSobreviveu,_unidadeSobreviveu,_emAndamento,callback){
    mongodb.connect(function(err, db){
        console.log("oi")
        db.collection("planejamento").updateOne({_id:require("mongodb").ObjectID(id),loginAgricultor:_loginAgricultor},{$set:{nomeCultivo:_nomeCultivo,canteiros:_canteiros,dataSemeadura:_dataSemeadura,quantPlanejada:_quantPlanejada,unidadePlanejada:_unidadePlanejada,quantPlantada:_quantPlantada,unidadePlantada:_unidadePlantada,quantSobreviveu:_quantSobreviveu,unidadeSobreviveu:_unidadeSobreviveu,emAndamento:_emAndamento}},callback);
    })
}


function disconnect() {
    return mongodb.disconnect();
}
module.exports = {disconnect, getAgricultorByLogin, getAllAgricultores, setNovoAgricultor,getLoginAgricultor,changeInfoByLogin,getCultivoByName, getAllCultivos, addAlimento, editAlimento, planejamentosAgricultor,novoPlanejamento, planejamentoById, alteraPlanejamento}