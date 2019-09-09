//rota inicial
global.app.get('/consulta', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('./views/consulta.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);
});


global.app.post('/ConsultaProfissao', function(req, res) {
    //chamada da função que está no registo.model e envio dos parâmetros

    console.log("Route do consultaprof")

    console.log("vinho - " + req.body.profissao);

    global.modelConsulta.getTrabalho(req.body.profissao, function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            data.forEach(function(row) {
                console.log("Aves ale - " + row.nome_cliente);
                console.log("Aves aves - " + row.email);
                console.log("Ale aves - " + row.id_cliente);
            })
            res.send(data)
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
    //envio da mensagem de sucesso
    //res.end('{"success": "Update Successfully", "status" : 200}');
});
global.app.get('/read', function(req, res) {
    //chamada da função read que está no user.model
    global.modelConsulta.getProfissao(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            console.log("recebeu - " + data)
            //envio para o cliente dos dados retornados pelo model
            data.forEach(function(row) {
                console.log("O VIOLAS É NABO - " + row.valor_linha);
            })
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.iDmerda = "";

global.app.post('/getIdParaCliente', function(req, res) {
    console.log("dar uma consolada - " + JSON.stringify(req.body));

    global.idDaPessoaComCV = "";

    //global.iDmerda = JSON.stringify(req.body);
    for (var i = 2; i < JSON.stringify(req.body).length; i++) {
        console.log("dentro do for - " + JSON.stringify(req.body)[i])
        if (JSON.stringify(req.body)[i] != '"' && JSON.stringify(req.body)[i] != ':' && JSON.stringify(req.body)[i] != '}') {
            global.idDaPessoaComCV += JSON.stringify(req.body)[i];
        }
    }

    console.log("o identificador é - " + global.idDaPessoaComCV);

    res.send(global.idDaPessoaComCV);
})

global.app.get('/cvShortEmpresa', function(req, res) {
    console.log("aves")
    //leitura do ficheiro registo.html
    var html = '../views/cvShortEmpresa.html';

    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    res.send(html)
});

global.app.get('/cvFullEmpresa', function(req, res) {
    console.log("aves")
    //leitura do ficheiro registo.html
    var html = '../views/cvFullEmpresa.html';

    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    res.send(html)
});

global.app.get('/obterNomeEmailDataEmpresa', function(req, res) {
    console.log("obterNomeEmailDataEmpresa")
    //global.arrayDocumentos = [];
    global.modelConsulta.obterNomeEmailDataEmpresa(function(err, data) {
        if (err) {
            console.log("Erro no preencherDocumentoFullPersTemplate")
        }
        else {
            console.log("sinto que tens raiva");
            console.log("o meu bolso contem - " + data);
            data.forEach(function(row) {
                console.log("obterNomeEmailData ROUTE: " + row);
                console.log("pep - " + row.nome_cliente);
                console.log("pep - " + row.data_nascimento);
                console.log("pep - " + row.email);
                //descobrir = data[0];
            })
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

global.app.get('/tipoTemplateEmpresa', function(req, res) {
    console.log("tipoTemplateEmpresa")
    //global.arrayDocumentos = [];
    global.modelConsulta.tipoTemplateEmpresa(function(err, data) {
        if (err) {
            console.log("Erro no tipoTemplate")
        }
        else {
            // data.forEach(function(row) {
            //     console.log("descobrir: " + data[0]);
            //     descobrir = data[0];
            // })

            var temp = "";

            data.forEach(function(row) {
                console.log("bmth - " + row.n_template)
                //console.log("tipo template - " + data[1]);
                //temp = row.n_template;
                temp = row.n_template;
            })

            console.log("TEMP - " + temp);

            if (temp == null) {
                res.send("nao");
            }
            else {
                res.send(temp);
            }

            //res.send(temp);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})


global.app.get('/descobrirDocumentoShortEmpresa', function(req, res) {
    console.log("descobrirDocumentoShortEmpresa ROUTE")
    //global.arrayDocumentos = [];
    global.modelConsulta.descobrirDocumentoShortEmpresa(function(err, data) {
        if (err) {
            console.log("Erro no descobrirDocumentoShortEmpresa")
        }
        else {
            var arrayParaController = [];
            console.log("J COLE - " + data[0]);
            arrayParaController.push(data[0]);

            data.forEach(function(row) {
                //console.log("descobrir 2 - " + row.desc_documento);
                console.log("descobrir 3 TRABALHO DE MERDA - " + row.id_documento);
                console.log("descobrir 4 TRABALHO DE MERDA - " + row.valor_linha);
                arrayParaController.push(row.valor_linha);
                //global.descobrirDocumentoFull = row.desc_documento;
                global.idShortEmpresa = row.id_documento;
            })

            for (var i = 0; i < arrayParaController.length; i++) {
                console.log("casalinho - " + arrayParaController[i]);
            }

            res.send(arrayParaController);
            res.end('{"success" : "Updated Successfully", "status" : 200}');

            arrayParaController = [];
        }
    })
})

global.app.get('/descobrirDocumentoFullEmpresa', function(req, res) {
    console.log("descobrirDocumentoFullEmpresa")
    //global.arrayDocumentos = [];
    global.modelConsulta.descobrirDocumentoFullEmpresa(function(err, data) {
        if (err) {
            console.log("Erro no descobrirDocumentoFull")
        }
        else {
            // data.forEach(function(row) {
            //     console.log("descobrir: " + data[0]);
            //     descobrir = data[0];
            // })
            var descobrir = [];
            var descricao = "";

            console.log("descobrir Full Empresa: " + data[0]);
            descobrir.push(data[0]);

            data[1].forEach(function(row) {
                console.log("descobrir 2 Full Empresa - " + row.desc_documento);
                console.log("descobrir 3 Full Empresa - " + row.id_documento);
                global.TIPOdocumento = row.desc_documento;
                global.IDdocumento = row.id_documento;
                descricao = row.desc_documento;
            })
            descobrir.push(descricao);

            res.send(descobrir);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

global.app.get('/verificarSubscricao', function(req, res) {
    console.log("verificarSubscricao")
    //global.arrayDocumentos = [];
    global.modelConsulta.verificarSubscricao(function(err, data) {
        if (err) {
            console.log("Erro no descobrirDocumentoFull")
        }
        else {
            // data.forEach(function(row) {
            //     console.log("descobrir: " + data[0]);
            //     descobrir = data[0];
            // })

            //console.log("descobrir Full Empresa: " + data[0]);
            //descobrir.push(data[0]);

            console.log("consolas te  - " + data);

            // data.forEach(function(row) {
            //     console.log("verificarSubscricao - " + row);
            //     //console.log("descobrir 3 Full Empresa - " + row.id_documento);
            //     //global.TIPOdocumento = row.desc_documento;
            //     //global.IDdocumento = row.id_documento;
            //     //descricao = row.desc_documento;
            // })
            //descobrir.push(descricao);

            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

global.app.post('/subscrever', function(req, res) {
    console.log("subscrever")
    //global.arrayDocumentos = [];
    global.modelConsulta.subscrever(function(err, data) {
        if (err) {
            console.log("Erro no subscrever")
        }
        else {
            // data.forEach(function(row) {
            //     console.log("descobrir: " + data[0]);
            //     descobrir = data[0];
            // })

            //console.log("descobrir Full Empresa: " + data[0]);
            //descobrir.push(data[0]);

            //console.log("consolas te  - " + data);

            // data.forEach(function(row) {
            //     console.log("verificarSubscricao - " + row);
            //     //console.log("descobrir 3 Full Empresa - " + row.id_documento);
            //     //global.TIPOdocumento = row.desc_documento;
            //     //global.IDdocumento = row.id_documento;
            //     //descricao = row.desc_documento;
            // })
            //descobrir.push(descricao);

            console.log(data);

            //res.send("subscrito");
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})
global.app.get('/EnviarEmailCliente',function(req, res) {
    global.modelConsulta.getEmailCliente(function(err, data) {
        if (err) {
            console.log("Erro no subscrever")
        }
        else {
            
            data.forEach(function(row){
                console.log("emails  - " + row.email);
                global.emailCliente = row.email;
            })

            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})
global.app.get('/EnviarNomeEmpresa',function(req, res) {
    global.modelConsulta.getNomeEmpresa(function(err, data) {
        if (err) {
            console.log("Erro no subscrever")
        }
        else {
            
            data.forEach(function(row){
                console.log("nomeeeeeeee  - " + row.nome_empresa);
                global.nomeEmpresa = row.nome_empresa;
            })

            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

global.app.get('/sendEmail', function(req, res) {
    console.log("email");
    //var email = global.modelConsulta.getEmailCliente(function(err, data) {

    //})
   // var nome = global.modelConsulta.getNomeEmpresa
    var transporter = global.nodemailer.createTransport(global.smtpTransport({
        service: 'gmail',
        auth: {
            user: 'luisviolas888@gmail.com',
            pass: "bcnsvddlwtdktqhm"
        }
    }));
    transporter.verify(function(error, success) {
        if (error) { console.log(error); }
        else { console.log('Server is ready to take our messages'); }
    })
    var mailOptions = {
        from: "luisviolas888@gmail.com",
        to: global.emailCliente,
        subject: "Subscriçao de CV",
        html: "Parabens, o seu cv foi susbcrito pela empresa: " + global.nomeEmpresa
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) { console.log(error); }
        else {
            console.log('Email sent: ' + info.response);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });

});
