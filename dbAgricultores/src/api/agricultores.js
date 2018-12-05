module.exports = function (app, repository) {
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    app.get('/dbagricultores/info', function (req, res, next) {
        repository.getAllAgricultores(function (err, agricultores) {
            if (err) return next(err);
            var arrs = new Array();
            for (var i = 0; i < agricultores.length; i++) {
                arrs.push({ "login": agricultores[i].login, "nome": agricultores[i].nome });
            }
            res.json(arrs);
        });
    })

    app.post('/dbagricultores/:login', function (req, res, next) {
        if (req.body.login == req.params.login) {

            repository.getAgricultorByLogin(req.params.login, function (err, agricultores) {
                if (err) return next(err);
                console.log(agricultores.length)
                if (agricultores.length == 0) {
                    repository.setNovoAgricultor(req.body.login, req.body.nome, req.body.contato, req.body.password, function (err1, resposta) {
                        if (err1) return (err1);
                        res.json(resposta);
                    })
                }
                else {
                    res.json({ Erro: "Login já existe" })
                }
            });

        }
        else {
            res.json({ Erro: "Login não condizente" });
        }
    })

    app.post('/dbagricultores/login/:login', function (req, res, next) {
        if (req.params.login == req.body.login) {
            repository.getLoginAgricultor(req.body.login, function (err, resposta) {
                if (err) return (err);
                console.log("Entrou aqui, young")
                console.log(resposta.length)
                for (var i = 0; i < resposta.length; i++) {
                    console.log("Teste")

                        if (resposta[i].password == req.body.password) {
                            res.json({ "Login": true, "key": "000" });
                        }



                }

            })
        }
        else {
            res.json({ "Erro 403": "Login não bate com o enviado" })
        }
    })

    app.get('/dbagricultores/:login', function (req, res, next) {
        repository.getAgricultorByLogin(req.params.login, function (err, agricultores) {
            if (err) return next(err);

            if (agricultores.length>= 1){
                delete agricultores[0]['_id']
                res.json(agricultores[0])
            }else{
              console.log('Nenhum usuário com o login provido encontrado')

            }
        });
    })

    app.get('/planejamento/:id', function (req, res, next) {
        console.log("Teste")
        repository.getPlanejamento(req.params.id, function (err, planejamento) {
            if (err) return next(err);
            res.json(planejamento);
        });
    })

    app.patch('/dbagricultores/:login/update', function (req, res, next) {
        repository.getAgricultorByLogin(req.params.login, function (err, agricultores) {
            if (err) return next(err)
            if (agricultores.length > 0) {
                console.log("tem usuario: " + agricultores.length)
                repository.changeInfoByLogin(req.body.login, req.body.password, req.body.nome, req.body.contato, function (err1, mudanca) {
                    if (err1) return next(err1)
                    res.json(mudanca)
                })
            }
        })
    })

    app.get("/variedades", function (req, res, next) {
        repository.getAllCultivos(function (err, cultivos) {
            if (err) return next(err);
            res.json(cultivos);
        });
    })

    app.get("/variedades/:alimento", function (req, res, next) {
        repository.getCultivoByName(req.params.alimento, function (err, cultivos) {
            if (err) return next(err);
            res.json(cultivos);
        })
    })

    app.post("/variedades/:alimento", function (req, res, next) {
        repository.addAlimento(req.body.cultivo, req.body.muda_ou_semente, req.body.dias_no_canteiro, req.body.iniciar_colheita_em, req.body.finalizar_colheitas_em, req.body.Classificacao_nutricional, function (err, resposta) {
            if (err) return (err);
            res.json(resposta);
        })
    })

    app.patch("/variedades/:alimento", function (req, res, next) {
        repository.editAlimento(req.body.cultivo, req.body.muda_ou_semente, req.body.dias_no_canteiro, req.body.iniciar_colheita_em, req.body.finalizar_colheitas_em, req.body.Classificacao_nutricional, function (err, resposta) {
            if (err) return (err);
            res.json(resposta);
        })
    })

    app.get("/dbagricultores/:login/planejamentos",function(req,res,next){
        repository.planejamentosAgricultor(req.params.login,function(err,planejamentos){
            if (err) return(err);
            res.json(planejamentos);
        })
    })
    app.get("/dbagricultores/planejamento/:id",function(req,res,next){
        console.log("testando testes")
        repository.planejamentoById(req.params.id,function(err,planejamentos){
            if (err) return (err);
            res.json(planejamentos);
        })
    })

    app.post("/dbagricultores/planejamento/:login",function(req,res,next){
        repository.novoPlanejamento(req.params.login,req.body.nomeCultivo,req.body.canteiros,req.body.dataSemeadura,req.body.quantPlanejada,req.body.unidadePlanejada,req.body.quantPlantada,req.body.unidadePlantada,req.body.quantSobreviveu,req.body.unidadeSobreviveu,req.body.emAndamento,function(err,resposta){
            if (err) return(err);
            res.json(resposta);
        })
    })

    app.patch("/dbagricultores/planejamento/:login/:id",function(req,res,next){
        repository.alteraPlanejamento(req.params.id,req.params.login,req.body.nomeCultivo,req.body.canteiros,req.body.dataSemeadura,req.body.quantPlanejada,req.body.unidadePlanejada,req.body.quantPlantada,req.body.unidadePlantada,req.body.quantSobreviveu,req.body.unidadeSobreviveu,req.body.emAndamento,function(err,resposta){
            if (err) return(err);
            res.json(resposta);
        })
    })

}
