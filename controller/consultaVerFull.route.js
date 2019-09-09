global.app.get('/preencherDocumentoFullTemplateEmpresa', function(req, res) {
    console.log("preencherDocumentoFullTemplateEmpresa")
    //global.arrayDocumentos = [];
    global.modelConsultaVerFull.preencherDocumentoFullTemplateEmpresa(function(err, data) {
        if (err) {
            console.log("Erro no preencherDocumentoFullTemplate")
        }
        else {
            data.forEach(function(row) {
                console.log("preencherDocumentoFullTemplateEmpresa ROUTE: " + row.valor_linha);
                //descobrir = data[0];
            })

            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

global.app.get('/preencherDocumentoFullPersTemplateEmpresa', function(req, res) {
    console.log("preencherDocumentoFullPersTemplateEmpresa")
    //global.arrayDocumentos = [];
    global.modelConsultaVerFull.preencherDocumentoFullPersTemplateEmpresa(function(err, data) {
        if (err) {
            console.log("Erro no preencherDocumentoFullPersTemplateEmpresa")
        }
        else {
            console.log("sinto que tens raiva");
            console.log("o meu bolso contem - " + data);
            data.forEach(function(row) {
                console.log("preencherDocumentoFullPersTemplateEmpresa ROUTE: " + row.valor_coluna);
                console.log("pep - " + row.nome_cliente);
                console.log("pep - " + row.data_nascimento);
                console.log("pep - " + row.email);
                //descobrir = data[0];
            })


// 
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
})

// global.app.post('/Criarpdf', function(req, res) {
//     console.log("PDF ROUTEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
//     var html = global.fs.readFileSync('./views/cvFullEmpresa.html', 'utf8');
//     var options = {
//         format: 'A4',
//         orientation: "landscape",
//         header: {
//     height: '45mm' ,
//     contents: '<div style="text-align: center;"> CV do :' + global.nomeCliente +'</div>'
//         }
//     };
//     var ola = "ola";
//     global.pdf.create(html, options).toFile('uploads/' + global.nomeCliente + '.pdf', function(err, res) {
//         if (err) return console.log(err);
//         console.log(res); // { filename: '/app/businesscard.pdf' }
//     });
//     res.send("PDF")
// })


global.app.get('/descobrirDocumentoFullTemplateEmpresa', function(req, res) {
    console.log("descobrirDocumentoFullTemplateEmpresa")
    //global.arrayDocumentos = [];
    global.modelConsultaVerFull.descobrirDocumentoFullTemplateEmpresa(function(err, data) {
        if (err) {
            console.log("Erro no descobrirDocumentoFullTemplateEmpresa")
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
