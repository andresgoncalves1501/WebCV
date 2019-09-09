global.app.get('/obterIdDocumentosFull', function(req, res) {
    console.log("Route da Rússia Full")
    //global.arrayDocumentosFull = [];
    global.modelCVFull.obterIdDocumentosFull(function(err, data) {
        if (err) {
            console.log("Erro no obterIdDocumentos")
        }
        else {
            console.log("a data é - " + data);
            data.forEach(function(row){
                console.log("cs go - " + data[0]);
                console.log("fifa - " + data[1]);
                console.log("gta - " + data[2]);
                //console.log("fifa - " + data[1]);
                
                global.operFull = data[0];
                //global.tipo_Full = data[1];
                data[1].forEach(function(row){
                    console.log("nota boa - " + row.desc_documento)
                    global.tipo_Full = row.desc_documento;
                })
                console.log("MIIIIIIAAAAA - " + global.tipo_Full);
            })
            //global.operFull = data;
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

//rota de gravação dos dados do cvFull
global.app.post('/saveDocumentFull', function(req, res) {
    console.log("entrou no route do saveDocumentFull")
    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelCVFull.saveDocumentFull(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("ano deu erro - route cv full");
            data.forEach(function(row) {
                console.log("route save_doc: " + row.id_documento);
                req.session.idDoc = row.id_documento;
            })
            console.log("session do doc - " + req.session.idDoc)
            global.idDoc = req.session.idDoc;
            console.log("O ID é - " + global.idDoc);
            //res.send(data_inser);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})
global.app.get('/EnviarEmail2', function(req, res) {
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
            html: global.nomeCliente + " alterou o seu livre Full Cv"
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

global.app.get('/EnviarEmailEmpresas2', function(req, res) {


    global.modelCVFull.getEmailEmpresas(function(err, data) {
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

global.app.post('/saveFullCV', function(req, res){
    console.log("entrou no route do saveShortCV");
    
    console.log("short_cv_route - " + req.body.profissaoFull);
    console.log("short_cv_route - " + req.body.cartaFull);
    console.log("short_cv_route - " + req.body.informacaoFull);
    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelCVFull.saveFullCV(req.body.profissaoFull, req.body.cartaFull, req.body.academicaFull, req.body.profissionalFull, req.body.projetos_npro_realizadosFull, req.body.projetos_pro_realizadosFull, req.body.skillsFull, req.body.objetivosFull, req.body.informacaoFull, function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("ano deu erro - route cv");
            
            //console.log("O ID é - " + req.session.ID);
            //res.send(data_inser);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})