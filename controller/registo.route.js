global.app.get('/registo', function(req, res) {
    console.log("aves")
    //leitura do ficheiro registo.html
    var html = global.fs.readFileSync('./views/registo.html');

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html)
});

//rota de gravação dos dados do registo
global.app.post('/save', function(req, res) {
    console.log("por favor funciona")
    //chamada da função que está no registo.model e envio dos parâmetros
    global.modelUser.save(req.body.account, req.body.email, req.body.password, req.body.name, req.body.bday, req.body.address, req.body.observations);
    console.log("information " + req.body.email)
    //envio da mensagem de sucesso
    res.end('{"success": "Update Successfully", "status" : 200}');
});

global.app.post('/verificarMail', function(req, res) {
    //chamada da função que está no registo.model e envio dos parâmetros

    global.modelUser.verificarMail(req.body.account, req.body.email, function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            console.log("route - " + data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
    //envio da mensagem de sucesso
    //res.end('{"success": "Update Successfully", "status" : 200}');
})
