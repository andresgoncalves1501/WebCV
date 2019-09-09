global.app.get('/cv', function(req, res) {
    //leitura do ficheiro registo.html
    var html = global.fs.readFileSync('./views/cv.html');

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html)
});

//var descobrirShort = "";


global.app.get('/descobrirDocumentoShort', function(req, res) {
    console.log("descobrirDocumentoShort ROUTE")
    //global.arrayDocumentos = [];
    global.modelCV.descobrirDocumentoShort(function(err, data) {
        if (err) {
            console.log("Erro no descobrirDocumentoShort")
        }
        else {
            var arrayParaController = [];

            console.log("J COLE - " + data[0]);
            arrayParaController.push(data[0]);

            data[1].forEach(function(row) {
                console.log("descobrir 2 MERDA - " + row);
                console.log("descobrir 3 MERDA - " + row.id_documento);
                console.log("descobrir 4 MERDA - " + row.valor_linha);
                arrayParaController.push(row.valor_linha);
                //global.descobrirDocumentoFull = row.desc_documento;
            })

            for (var i = 0; i < arrayParaController.length; i++) {
                console.log("casalinho - " + arrayParaController[i]);
            }

            res.send(arrayParaController);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})


global.app.post('/api/upload/application',global.upload.single("file-to-upload"),(req, res)=> {
    
    console.log("FTO")
})



global.app.get('/obterIdDocumentos', function(req, res) {
    console.log("Route da Rússia")
    //global.arrayDocumentos = [];
    global.modelCV.obterIdDocumentos(function(err, data) {
        if (err) {
            console.log("Erro no obterIdDocumentos")
        }
        else {
            console.log("a data é - " + data)
            global.oper = data;
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})
global.app.get('/EnviarEmail', function(req, res) {
    console.log("email");
    //var email = global.modelConsulta.getEmailCliente(function(err, data) {

    //})
    // var nome = global.modelConsulta.getNomeEmpresa
    for (var i = 0; i < global.emailsArray.length; i++) {
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
            to: global.emailsArray[i],
            subject: "Alteração do CV",
            html: global.nomeCliente + " alterou o seu short Cv"
        }
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) { console.log(error); }
            else {
                console.log('Email sent: ' + info.response);
                res.end('{"success" : "Updated Successfully", "status" : 200}');
            }
        });
    }
})

global.app.get('/EnviarEmailEmpresas', function(req, res) {


    global.modelCV.getEmailEmpresas(function(err, data) {
        if (err) {
            console.log("Erro no subscrever")
        }
        else {
            global.emailsArray = [];
            if (data[0] == "nao") {

            }
            else if (data[0] == "sim") {

                data[1].forEach(function(row) {
                    console.log("EMAIL - " + row.email)
                    global.emailsArray.push(row.email);
                })


                // data.forEach(function(row) {
                //     console.log("nomeeeeeeee  - " + row.email);
                //     global.Empresas.push(row.eamil);
                // })
            }
            res.send(data)

        }
        res.end('{"success" : "Updated Successfully", "status" : 200}');
    })
})

//rota de gravação dos dados do cv
global.app.post('/saveDocument', function(req, res) {
    console.log("entrou no route do saveDocument")
    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelCV.saveDocument(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("ano deu erro - route cv");
            data.forEach(function(row) {
                console.log("route save_doc: " + row.id_documento);
                req.session.idDoc = row.id_documento;
            })
            console.log("seesion do doc - " + req.session.idDoc)
            global.idDoc = req.session.idDoc;
            console.log("O ID é - " + global.idDoc);
            //res.send(data_inser);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})

global.app.post('/saveShortCV', function(req, res) {
    console.log("entrou no route do saveShortCV");

    console.log("short_cv_route - " + req.body.profissao);
    console.log("short_cv_route - " + req.body.carta);
    console.log("short_cv_route - " + req.body.informacao);

    global.profissao = req.body.profissao;
    global.carta = req.body.carta;
    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelCV.saveShortCV(req.body.profissao, req.body.carta, req.body.academica, req.body.profissional, req.body.projetos, req.body.skills, req.body.objetivos, req.body.informacao, function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("ano nao deu erro - route cv");

            //console.log("O ID é - " + req.session.ID);
            //res.send(data_inser);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})

global.app.get('/descobrirDocumentoFull', function(req, res) {
    console.log("descobrirDocumentoFull")
    //global.arrayDocumentos = [];
    global.modelCV.descobrirDocumentoFull(function(err, data) {
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

            console.log("descobrir: " + data[0]);
            descobrir.push(data[0]);

            data[1].forEach(function(row) {
                console.log("descobrir 2 - " + row.desc_documento);
                console.log("descobrir 3 - " + row.id_documento);
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

global.app.get('/preencherDocumentoFull', function(req, res) {
    console.log("preencherDocumentoFull")
    //global.arrayDocumentos = [];
    global.modelCV.preencherDocumentoFull(function(err, data) {
        if (err) {
            console.log("Erro no preencherDocumentoFull")
        }
        else {
            data.forEach(function(row) {
                console.log("preencherDocumentoFull ROUTE: " + row.valor_linha);
                //descobrir = data[0];
            })

            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

global.app.get('/preencherDocumentoFullPers', function(req, res) {
    console.log("preencherDocumentoFullPers")
    //global.arrayDocumentos = [];
    global.modelCV.preencherDocumentoFullPers(function(err, data) {
        if (err) {
            console.log("Erro no preencherDocumentoFullPers")
        }
        else {
            console.log("sinto que tens raiva");
            console.log("o meu bolso contem - " + data);
            data.forEach(function(row) {
                console.log("preencherDocumentoFullPers ROUTE: " + row.valor_coluna);
                //descobrir = data[0];
            })

            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})


// global.app.post('/file/upload', function(req, res) {
//     var Storage = global.multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, './img')
//             console.log(req.file.cv);
//         },
//         filename: function(req, file, cb) {
//             cb(null, file.originalname);
//         }

//     });
//     var upload = global.multer({ Storage });

//     upload.single('image')
//     console.log(req + "ola")
//     //res.send({s:false})
// });
