global.app.get('/criarcv', function(req, res){
    console.log("aves")
    //leitura do ficheiro registo.html
    var html = global.fs.readFileSync('./views/cv.html');
    
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html)
});

//rota de gravação dos dados do registo
//global.app.post('/saveCV', function(req, res){
    //console.log("por favor funciona")
    //chamada da função que está no registo.model e envio dos parâmetros
    //global.modelHistorico.saveCV(req.body.profissao, req.body.tipo_carta_conducao, req.body.carreira_academica, req.body.experiencia_profissional, req.body.projetos_realizados, req.body.skills, req.body.objetivos, req.body.informacao_adicional);
    //envio da mensagem de sucesso
    //res.end('{"success": "Update Successfully", "status" : 200}');
    
    //console.log("route console: " + req.body.email)
//});

//rota de leitura
global.app.get('/readUserInfo', function(req, res) {
    //chamada da função read que está no user.model
    global.modelHistorico.readUserInfo(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});