$("#gdFull").click(function() {

    console.log("entrou no full");

    var data = {};

    data.profissaoFull = $("#profissaoFull").val();
    data.cartaFull = $("#tipo_carta_conducaoFull").val();
    data.academicaFull = $("#carreira_academicaFull").val();
    data.profissionalFull = $("#experiencia_profissionalFull").val();
    data.projetos_npro_realizadosFull = $("#projetos_npro_realizadosFull").val();
    data.projetos_pro_realizadosFull = $("#projetos_pro_realizadosFull").val();
    data.skillsFull = $("#skillsFull").val();
    data.objetivosFull = $("#objetivosFull").val();
    data.informacaoFull = $("#informacao_adicionalFull").val();

    console.log("controller full - " + data.projetos_pro_realizadosFull);
    console.log("controller full - " + data.cartaFull);
    console.log("controller full - " + data.informacaoFull);

    $.ajax({
        type: 'GET',
        url: '../obterIdDocumentosFull',
        success: function(result) {
            //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
            if (result.status == 200) {
                //alert("submitted with success 1");
            }

            $.ajax({
                type: 'POST',
                url: '../saveDocumentFull',
                data: data,
                success: function(result) {
                    //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
                    if (result.status == 200) {
                        //alert("submitted with success");
                    }

                    $.ajax({
                        type: 'POST',
                        url: '../saveFullCV',
                        data: data,
                        success: function(result) {
                            //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
                            if (result.status == 200) {
                                //alert("submitted with success 2");
                            }

                            // mail
                            $.ajax({
                                type: 'GET',
                                url: '../EnviarEmailEmpresas2',
                                data: JSON.stringify(data),
                                contentType: 'application/json',
                                success: function(dataEmail) {
                                    //analisa res.end que está no result e se o status for 200 envia um alerta
                                    if (result.status == 200) {
                                        //alert("submitted with success"); 
                                    }

                                    //var emailsArray = [];

                                    console.log("resultado - " + dataEmail[0])
                                    if (dataEmail[0] == "nao") {

                                    }
                                    else if (dataEmail[0] == "sim") {

                                        dataEmail[1].forEach(function(row) {
                                            console.log("EMAIL - " + row.email)
                                            //emailsArray.push(row.email);
                                        })


                                        $.ajax({
                                            type: 'GET',
                                            url: '../EnviarEmail2',
                                            data: JSON.stringify(data),
                                            contentType: 'application/json',
                                            success: function(result) {
                                                //analisa res.end que está no result e se o status for 200 envia um alerta
                                                if (result.status == 200) {
                                                    //alert("submitted with success"); 
                                                }

                                            },
                                            error: function(data) { console.log("MUITOS ERROS") }
                                        });
                                    }



                                },
                                error: function(data) { console.log("MUITOS ERROS") }
                            });
                        },
                        error: function(data) { console.log("falha 2 ajax") }
                    });
                },
                error: function(data) { console.log("falha 1 ajax") }
            });
        },
        error: function(data) { console.log("Quero morrer 2") }
    })
})
