module.exports = function (app, repository) {
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    app.get('/dbagricultores', function (req, res, next) {
        repository.getAllAgricultores(function (err, agricultores) {
            if (err) return next(err);
            res.json(agricultores);
        });
    })

    app.get('/dbagricultores/info', function (req, res, next) {
        repository.getAllAgricultores(function (err, agricultores) {
            if (err) return next(err);
            var arrs = new Array();
            for (var i = 0; i < agricultores.length; i++) {
                arrs.push({ "_id": agricultores[i]._id, "nome": agricultores[i].nome });
            }
            res.json(arrs);
        });
    })

    app.post('/dbagricultores', function (req, res, next) {
        repository.setNovoAgricultor(req.body.login, req.body.nome, req.body.contato, req.body.password, function (err, resposta) {
            if (err) return (err);
            res.json(resposta);
        })
    })

    app.post('/dbagricultores/login', function (req, res, next) {
        repository.getLoginAgricultor(req.body.login, function (err, resposta) {
            if (err) return (err);
            console.log("Entrou aqui, young")
            console.log(resposta.length)
            for (var i = 0; i < resposta.length; i++) {
                console.log("Teste")
                try {
                    if (resposta[i].password == req.body.password) {
                        res.json({ "Login": true, "key": 000 });
                    }
                    
                }
                catch{ console.log("Try fail") }
            }

            })
    })

    app.get('/dbagricultores/:id', function (req, res, next) {
        repository.getAgricultorById(req.params.id, function (err, agricultores) {
            if (err) return next(err);
            res.json(agricultores);
        });
    })

    app.get('/planejamento/:id', function (req, res, next) {
        console.log("Teste")
        repository.getPlanejamento(req.params.id, function (err, planejamento) {
            if (err) return next(err);
            res.json(planejamento);
        });
    })


}