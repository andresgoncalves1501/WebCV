global.app.get('/cvFull', function(req, res) {
    console.log("aves")
    //leitura do ficheiro registo.html
    var html = './views/Full.html';

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.send(html)
});

global.app.get('/preencherDocumentoFullTemplate', function(req, res) {
    console.log("preencherDocumentoFull")
    //global.arrayDocumentos = [];
    global.modelCarregarTemplate.preencherDocumentoFullTemplate(function(err, data) {
        if (err) {
            console.log("Erro no preencherDocumentoFullTemplate")
        }
        else {
            data.forEach(function(row) {
                console.log("preencherDocumentoFullTemplate ROUTE: " + row.valor_linha);
                //descobrir = data[0];
            })

            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

global.app.get('/preencherDocumentoFullPersTemplate', function(req, res) {
    console.log("preencherDocumentoFullPersTemplate")
    //global.arrayDocumentos = [];
    global.modelCarregarTemplate.preencherDocumentoFullPersTemplate(function(err, data) {
        if (err) {
            console.log("Erro no preencherDocumentoFullPersTemplate")
        }
        else {
            console.log("sinto que tens raiva");
            console.log("o meu bolso contem - " + data);
            data.forEach(function(row) {
                console.log("preencherDocumentoFullPersTemplate ROUTE: " + row.valor_coluna);
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


global.app.get('/obterNomeEmailData', function(req, res) {
    console.log("obterNomeEmailData")
    //global.arrayDocumentos = [];
    global.modelCarregarTemplate.obterNomeEmailData(function(err, data) {
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
global.app.post('/Criarpdf', function(req, res) {
    console.log("PDF ROUTEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    var html = global.fs.readFileSync('./views/cvFullEmpresa.html', 'utf8');
    var options = {
        format: 'A4',
        orientation: "landscape",
        header: {
    height: '45mm' ,
    contents: '<div style="text-align: center;"> CV do :' + global.nomeCliente +'</div>'
        }
    };
    var ola = "ola";
    global.pdf.create(html, options).toFile('uploads/' + global.nomeCliente + '.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    res.send("PDF")
})


global.app.get('/descobrirDocumentoFullTemplate', function(req, res) {
    console.log("descobrirDocumentoFullTemplate")
    //global.arrayDocumentos = [];
    global.modelCarregarTemplate.descobrirDocumentoFullTemplate(function(err, data) {
        if (err) {
            console.log("Erro no descobrirDocumentoFullTemplate")
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
                global.IDdocumento = row.id_documento;
                descricao = row.desc_documento;
            })
            descobrir.push(descricao);

            res.send(descobrir);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

global.app.get('/tipoTemplate', function(req, res) {
    console.log("tipoTemplate")
    //global.arrayDocumentos = [];
    global.modelCarregarTemplate.tipoTemplate(function(err, data) {
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
