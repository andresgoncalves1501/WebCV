global.app.get('/procurarTemplate', function(req, res) {
    console.log("entrou no route do procurarTemplate");

    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelTemplate.procurarTemplate(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //var valor = 0;
            //envio para o cliente dos dados retornados pelo model
            console.log("PROCURAR TEMPLATE ROUTE");
            // data.forEach(function(row) {
            //     console.log("route save_doc: " + row.id_documento);
            //     req.session.idDoc = row.id_documento;
            // })
            // console.log("session do doc - " + req.session.idDoc)
            // global.idDoc = req.session.idDoc;
            // console.log("O ID é - " + global.idDoc);
            console.log("agua de coco - " + data[0]);
            
            data[1].forEach(function(row){
                console.log("Guardar Template - " + row.id_documento);
                console.log("Guardar Template 2 - " + row.n_template);
                //res.sendStatus(row.id_documento);
            })
            
            //global.template = data;


            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})

//rota de gravação do template
global.app.post('/guardarTemplate', function(req, res) {
    console.log("entrou no route do guardarTemplate");

    console.log("relacao - " + req.body.template);

    //chamada da função que está no cv.model e envio dos parâmetros
    global.modelTemplate.guardarTemplate(req.body.template, function(err, data) {
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

            console.log("Guardar Template - " + data);
            //global.template = data;


            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }

    });
})
