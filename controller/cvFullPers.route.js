//rota de gravação dos dados do cvFull
global.app.post('/saveDocumentFullPers', function(req, res) {
    console.log("entrou no route do saveDocumentFull")
    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelCVFullPers.saveDocumentFullPers(function(err, data) {
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
            console.log("session do doc - " + req.session.idDoc)
            global.idDoc = req.session.idDoc;
            console.log("O ID é - " + global.idDoc);
            //res.send(data_inser);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})

global.app.post('/saveLinhaCVPers', function(req, res) {
    console.log("entrou no route do saveFullCVPers");

    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelCVFullPers.saveLinhaCVPers(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("ano deu erro - route cv");

            data.forEach(function(row) {
                console.log("route save_doc: " + row.id_linha);
                req.session.idLinha = row.id_linha;
                //global.idLinha = parseInt(row.id_linha);
                //console.log("madrugada - " + global.idLinha);
                console.log("for each - " + req.session.idLinha)
            })
            console.log("A sessao da linha é - " + req.session.idLinha);
            global.idLinha = req.session.idLinha;
            console.log("O global é da linha é - " + global.idLinha);
            //res.send(data_inser);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})


global.app.get('/EnviarEmail1', function(req, res) {
    console.log("email");
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
            html: global.nomeCliente + " alterou o seu full Cv"
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

global.app.get('/EnviarEmailEmpresas1', function(req, res) {


    global.modelCVFullPers.getEmailEmpresas(function(err, data) {
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

global.app.post("/saveFullCVPers", function(req, res) {
    console.log("entrou no route do saveFullCVPers")

    console.log("fullPers_cv_route - " + req.body.profissaoFullPers);
    console.log("fullPers_cv_route - " + req.body.cartaFull1);
    console.log("fullPers_cv_route - " + req.body.ens1);


    //arrayTabelas.push(req.body.profissaoFullPers);
    //arrayTabelas.push(req.body.cartaFullPers);

    var arrayTabelaAcademica = [];

    arrayTabelaAcademica.push(req.body.ens1);
    arrayTabelaAcademica.push(req.body.cur1);
    arrayTabelaAcademica.push(req.body.aiens1);
    arrayTabelaAcademica.push(req.body.afens1);
    arrayTabelaAcademica.push(req.body.notf1);
    arrayTabelaAcademica.push(req.body.ens2);
    arrayTabelaAcademica.push(req.body.cur2);
    arrayTabelaAcademica.push(req.body.aiens2);
    arrayTabelaAcademica.push(req.body.afens2);
    arrayTabelaAcademica.push(req.body.notf2);
    arrayTabelaAcademica.push(req.body.ens3);
    arrayTabelaAcademica.push(req.body.cur3);
    arrayTabelaAcademica.push(req.body.aiens3);
    arrayTabelaAcademica.push(req.body.afens3);
    arrayTabelaAcademica.push(req.body.notf3);

    //arrayTabelas.push(req.body.mais_info_academica);

    var arrayTabelaProfissional = [];

    arrayTabelaProfissional.push(req.body.emp1);
    arrayTabelaProfissional.push(req.body.aiemp1);
    arrayTabelaProfissional.push(req.body.afemp1);
    arrayTabelaProfissional.push(req.body.prof1);
    arrayTabelaProfissional.push(req.body.emp2);
    arrayTabelaProfissional.push(req.body.aiemp2);
    arrayTabelaProfissional.push(req.body.afemp2);
    arrayTabelaProfissional.push(req.body.prof2);
    arrayTabelaProfissional.push(req.body.emp3);
    arrayTabelaProfissional.push(req.body.aiemp3);
    arrayTabelaProfissional.push(req.body.afemp3);
    arrayTabelaProfissional.push(req.body.prof3);

    //arrayTabelas.push(req.body.mais_info_profissional);


    var arrayTabelaPNP = [];

    arrayTabelaPNP.push(req.body.nomnpro1);
    arrayTabelaPNP.push(req.body.temnpro1);
    arrayTabelaPNP.push(req.body.ainpro1);
    arrayTabelaPNP.push(req.body.afnpro1);
    arrayTabelaPNP.push(req.body.urlnpro1);
    arrayTabelaPNP.push(req.body.nomnpro2);
    arrayTabelaPNP.push(req.body.temnpro2);
    arrayTabelaPNP.push(req.body.ainpro2);
    arrayTabelaPNP.push(req.body.afnpro2);
    arrayTabelaPNP.push(req.body.urlnpro2);
    arrayTabelaPNP.push(req.body.nomnpro3);
    arrayTabelaPNP.push(req.body.temnpro3);
    arrayTabelaPNP.push(req.body.ainpro3);
    arrayTabelaPNP.push(req.body.afnpro3);
    arrayTabelaPNP.push(req.body.urlnpro3);


    var arrayTabelaPP = [];

    arrayTabelaPP.push(req.body.nompro1);
    arrayTabelaPP.push(req.body.tempro1);
    arrayTabelaPP.push(req.body.aipro1);
    arrayTabelaPP.push(req.body.afpro1);
    arrayTabelaPP.push(req.body.urlpro1);
    arrayTabelaPP.push(req.body.nompro2);
    arrayTabelaPP.push(req.body.tempro2);
    arrayTabelaPP.push(req.body.aipro2);
    arrayTabelaPP.push(req.body.afpro2);
    arrayTabelaPP.push(req.body.urlpro2);
    arrayTabelaPP.push(req.body.nompro3);
    arrayTabelaPP.push(req.body.tempro3);
    arrayTabelaPP.push(req.body.aipro3);
    arrayTabelaPP.push(req.body.afpro3);
    arrayTabelaPP.push(req.body.urlpro3);

    for (var i = 0; i < arrayTabelaAcademica.length; i++) {
        console.log("maior array do mundo - " + arrayTabelaAcademica[i]);
    }


    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelCVFullPers.saveFullCVPers(req.body.profissaoFullPers, req.body.cartaFullPers, arrayTabelaAcademica, req.body.mais_info_academica, arrayTabelaProfissional, req.body.mais_info_profissional, arrayTabelaPNP, arrayTabelaPP, req.body.capacidadesPers, req.body.objetivosPers, req.body.informacao_adicionalPers, function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("ano deu erro - route cv");
            // data.forEach(function(row) {
            //     console.log("route save_doc: " + row.id_documento);
            //     req.session.idDoc = row.id_documento;
            // })
            // console.log("session do doc - " + req.session.idDoc)
            // global.idDoc = req.session.idDoc;
            // console.log("O ID é - " + global.idDoc);
            // res.send("feito");
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})
