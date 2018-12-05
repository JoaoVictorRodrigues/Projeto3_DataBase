//Confirmar que é aqui que eu coloco
//const jwt= require('jsonwebtoken')

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
        //Requer token
        repository.getAgricultorByLogin(req.params.login, function (err, agricultores) {
            if (err) return next(err);
            if (agricultores.length > 0) {
                let token= getToken(req);

              if (token === undefined){
                console.log("Nenhum token provido, quitando")
                res.status(401);
              }else{
                console.log("Token encontrado, conferindo...")
                if (repository.tokenValidate(agricultores[0].login, agricultores[0].password, token)){
                  console.log("token válido")

                  if (agricultores.length == 0) {
                      repository.setNovoAgricultor(req.params.login, req.body.nome, req.body.contato, req.body.password, function (err1, resposta) {
                          if (err1) return (err1);
                          res.json(resposta);
                      })
                  }
                  else {
                      console.log('Login já existe')
                      res.status(409)
                      res.json({})
                  }

                }else{
                  console.log("token invalido")
                  res.status(403)
                  res.json({})
                }
              }
            }else{
              res.status(404)
              res.json({})
            }
        });
    })

    app.post('/dbagricultores/login/:login', function (req, res, next) {
      repository.getLoginAgricultor(req.params.login, function (err, resposta) {
          if (err) return (err);
          console.log(resposta.length)
          for (var i = 0; i < resposta.length; i++) {

              try {
                  if (resposta[i].password == req.body.password) {
                      //Acho que dentro deste if devo prover meu token
                      let token= repository.tokenGenerate(resposta[i].login, resposta[i].password);
                      res.json({ "token": token});
                  }else{
                    console.log("Senha não bate")
                    res.status(403)
                    res.json({})
                  }
              }
              catch(err){ console.log(err) }
          }

      })
    })

    app.get('/dbagricultores/:login', function (req, res, next) {
        repository.getAgricultorByLogin(req.params.login, function (err, agricultores) {
            if (err) return next(err);

            if (agricultores.length>= 1){
                delete agricultores[0]['_id']
                res.json(agricultores[0])
            }else{
              console.log('Nenhum usuário com o login provido encontrado')
              res.status(404)
              res.json({})
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

    app.patch('/dbagricultores/:login', function (req, res, next) {
        //Requer Token
        repository.getAgricultorByLogin(req.params.login, function (err, agricultores) {
            if (err) return next(err)
            if (agricultores.length > 0) {
                let token= getToken(req);

                if (token === undefined){
                  console.log("Nenhum token provido, quitando")
                  res.status(401);
                  res.json({})
                }else{
                  console.log("Token encontrado, conferindo...")

                  if (repository.tokenValidate(agricultores[0].login, agricultores[0].password, token)){
                    console.log("token válido")

                    repository.changeInfoByLogin(req.body.login, req.body.password, req.body.nome, req.body.contato, function (err1, mudanca) {
                        if (err1) return next(err1)
                        res.json(mudanca)
                    })
                  }else{
                    console.log("token invalido")
                    res.status(403)
                    res.json({})
                  }
                }
            }else{
              res.status(404);
              res.json({})
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
        //Requer token
        repository.getAgricultorByLogin(req.params.login, function (err, agricultores) {
            if (err) return next(err)
            if (agricultores.length > 0) {
                let token= getToken(req);

                if (token === undefined){
                  console.log("Nenhum token provido, quitando")
                  res.status(401);
                  res.json({})
                }else{
                  console.log("Token encontrado, conferindo...")

                  if (repository.tokenValidate(agricultores[0].login, agricultores[0].password, token)){
                    console.log("token válido")

                    repository.novoPlanejamento(req.params.login,req.body.nomeCultivo,req.body.canteiros,req.body.dataSemeadura,req.body.quantPlanejada,req.body.unidadePlanejada,req.body.quantPlantada,req.body.unidadePlantada,req.body.quantSobreviveu,req.body.unidadeSobreviveu,req.body.emAndamento,function(err,resposta){
                        if (err) return(err);
                        res.json(resposta);
                    })
                  }else{
                    console.log("token invalido")
                    res.status(403)
                    res.json({})
                  }
                }
            }else{
              res.status(404);
              res.json({})
            }
        })
    })

    app.patch("/dbagricultores/planejamento/:login/:id",function(req,res,next){
      //Requer token
      repository.getAgricultorByLogin(req.params.login, function (err, agricultores) {
          if (err) return next(err)
          if (agricultores.length > 0) {
              let token= getToken(req);

              if (token === undefined){
                console.log("Nenhum token provido, quitando")
                res.status(401);
                res.json({})
              }else{
                console.log("Token encontrado, conferindo...")

                if (repository.tokenValidate(agricultores[0].login, agricultores[0].password, token)){
                  console.log("token válido")

                  repository.alteraPlanejamento(req.params.id,req.params.login,req.body.nomeCultivo,req.body.canteiros,req.body.dataSemeadura,req.body.quantPlanejada,req.body.unidadePlanejada,req.body.quantPlantada,req.body.unidadePlantada,req.body.quantSobreviveu,req.body.unidadeSobreviveu,req.body.emAndamento,function(err,resposta){
                      if (err) return(err);
                      res.json(resposta);
                  })
                }else{
                  console.log("token invalido")
                  res.status(403)
                  res.json({})
                }
              }
          }else{
            res.status(404);
            res.json({})
          }
      })
    })

}
