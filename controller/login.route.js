global.app.get('/login', function(req, res) {
    console.log("aves")
    //leitura do ficheiro registo.html
    var html = global.fs.readFileSync('./views/login.html');

    if (req.session.email) {
        console.log("html + " + req.session.email)
        html += '<p> Your username from your session is: ' + req.session.email + '</p>';
    }

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html)
});

global.app.post('/loginPost', function(req, res) {
    console.log("session route body - " + req.body.email + " " + req.body.account);
    //req.session.email = req.body.email;
    //console.log("session route - " + req.session.email);
    global.modelLogin.obterId(req.body.account, req.body.email, function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("route - " + req.body.email);
            data.forEach(function(row) {
                console.log("da por favorr: " + row.id)
                req.session.ID = row.id;
                console.log("a row do nome w - " + row.nome);
                req.session.nome = row.nome;
            })
            global.id = req.session.ID;
            global.idGuardarNaEmp = req.session.ID;
            global.nomeCliente = req.session.nome;
            console.log("o nome ÈEEEEEEE - " + req.session.nome)
            console.log("O ID é - " + req.session.ID);
            var array = [req.session.nome, req.body.account];
            res.send(array);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });

    //global.modelCV.saveCV(req.body.ID, function(err, data) {
        //if (err) {
            // error handling code goes here
            //console.log("ERROR : ", err);
        //}
        //else {
            //envio para o cliente dos dados retornados pelo model
            //console.log("route2 - " + req.body.ID);
        //}
    //})
    //res.redirect('/login');
    //res.end('{"success" : "Updated Successfully", "status" : 200}');
})

global.app.post('/fazerLogin', function(req, res) {
    //chamada da função que está no registo.model e envio dos parâmetros

    global.modelLogin.fazerLogin(req.body.account, req.body.email, req.body.password, function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("route - " + req.body.account + " " + req.body.email + " " + req.body.password)
            res.send(data);
            console.log("route - " + data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
    //envio da mensagem de sucesso
    //res.end('{"success": "Update Successfully", "status" : 200}');
});

global.app.post('/destruirSessao', function(req, res){
    console.log("entrou na sessao destruida")
    console.log("ID - " + req.session.ID);
    console.log("NOME - " + req.session.nome);
    // req.session.destroy(function (err) {
    //     console.log("sessao destruida");
    //     res.send("Destruido")
    // })
    res.send("Destruido")
})