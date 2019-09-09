//rota inicial
global.app.get('/subscricoes', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('./views/subscricoes.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);
});

global.app.get('/criarTabelaSubs', function(req, res) {
    //chamada da função read que está no user.model
    global.modelSubscricoes.criarTabelaSubs(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            console.log("recebeu - " + data)
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.app.post('/removerSub', function(req, res) {
    //chamada da função read que está no user.model
    global.modelSubscricoes.removerSub(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            console.log("recebeu - " + data)
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});