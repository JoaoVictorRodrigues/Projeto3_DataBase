module.exports = function (app, repository) {

    app.get('/dbagricultores', function (req, res, next) {
        repository.getAllAgricultores(function (err, agricultores) {
            if (err) return next(err);
            res.json(agricultores);
        });
    })

    app.get('/dbagricultores/:id', function(req,res,next) {
        repository.getAgricultorById(req.params.id, function(err, agricultores){
            if(err) return next(err);
            res.json(agricultores)
        });
    })

    app.get('/planejamento/:id', function(req,res,next) {
        repository.getPlanejamento(req.params.id, function(err, planejamento){
            if(err) return next(err);
            res.json(planejamento)
        });
    })

    app.get("/cultivos", function (req, res, next) {
      repository.getAllCultivos(function (err, cultivos) {
          if (err) return next(err);
          res.json(cultivos);
      });
    })


    app.post()

}
