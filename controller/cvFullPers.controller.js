$("#gdFullPers").click(function() {

    console.log("entrou no full");

    var data = {};

    data.profissaoFullPers = $("#profissaoFullPers").val();
    data.cartaFullPers = $("#tipo_carta_conducaoFullPers").val();

    data.ens1 = $("#ens1").val();
    data.cur1 = $("#cur1").val();
    data.aiens1 = $("#aiens1").val();
    data.afens1 = $("#afens1").val();
    data.notf1 = $("#notf1").val();
    data.ens2 = $("#ens2").val();
    data.cur2 = $("#cur2").val();
    data.aiens2 = $("#aiens2").val();
    data.afens2 = $("#afens2").val();
    data.notf2 = $("#notf2").val();
    data.ens3 = $("#ens3").val();
    data.cur3 = $("#cur3").val();
    data.aiens3 = $("#aiens3").val();
    data.afens3 = $("#afens3").val();
    data.notf3 = $("#notf3").val();

    data.mais_info_academica = $("#mais_info_academica").val();


    data.emp1 = $("#emp1").val();
    data.aiemp1 = $("#aiemp1").val();
    data.afemp1 = $("#afemp1").val();
    data.prof1 = $("#prof1").val();
    data.emp2 = $("#emp2").val();
    data.aiemp2 = $("#aiemp2").val();
    data.afemp2 = $("#afemp2").val();
    data.prof2 = $("#prof2").val();
    data.emp3 = $("#emp3").val();
    data.aiemp3 = $("#aiemp3").val();
    data.afemp3 = $("#afemp3").val();
    data.prof3 = $("#prof3").val();

    data.mais_info_profissional = $("#mais_info_profissional").val();

    data.nomnpro1 = $("#nomnpro1").val();
    data.temnpro1 = $("#temnpro1").val();
    data.ainpro1 = $("#ainpro1").val();
    data.afnpro1 = $("#afnpro1").val();
    data.urlnpro1 = $("#urlnpro1").val();
    data.nomnpro2 = $("#nomnpro2").val();
    data.temnpro2 = $("#temnpro2").val();
    data.ainpro2 = $("#ainpro2").val();
    data.afnpro2 = $("#afnpro2").val();
    data.urlnpro2 = $("#urlnpro2").val();
    data.nomnpro3 = $("#nomnpro3").val();
    data.temnpro3 = $("#temnpro3").val();
    data.ainpro3 = $("#ainpro3").val();
    data.afnpro3 = $("#afnpro3").val();
    data.urlnpro3 = $("#urlnpro3").val();

    data.nompro1 = $("#nompro1").val();
    data.tempro1 = $("#tempro1").val();
    data.aipro1 = $("#aipro1").val();
    data.afpro1 = $("#afpro1").val();
    data.urlpro1 = $("#urlpro1").val();
    data.nompro2 = $("#nompro2").val();
    data.tempro2 = $("#tempro2").val();
    data.aipro2 = $("#aipro2").val();
    data.afpro2 = $("#afpro2").val();
    data.urlpro2 = $("#urlpro2").val();
    data.nompro3 = $("#nompro3").val();
    data.tempro3 = $("#tempro3").val();
    data.aipro3 = $("#aipro3").val();
    data.afpro3 = $("#afpro3").val();
    data.urlpro3 = $("#urlpro3").val();

    data.capacidadesPers = $("#capacidadesPers").val();

    data.objetivosPers = $("#objetivosPers").val();

    data.informacao_adicionalPers = $("#informacao_adicionalPers").val();

    console.log("controller full - " + data.profissaoFullPers);
    console.log("controller full - " + data.cartaFullPers);
    console.log("controller full - " + data.ens1);
    console.log("controller full - " + data.capacidadesPers);
    console.log("controller full - " + data.objetivosPers);
    console.log("controller full - " + data.informacao_adicionalPers);

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
                url: '../saveDocumentFullPers',
                data: data,
                success: function(result) {
                    //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
                    if (result.status == 200) {
                        //alert("submitted with success");
                    }
                    $.ajax({
                        type: 'POST',
                        url: '../saveLinhaCVPers',
                        data: data,
                        success: function(result) {
                            //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta

                            $.ajax({
                                type: 'GET',
                                url: '../EnviarEmailEmpresas1',
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
                                            url: '../EnviarEmail1',
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

                            $.ajax({
                                type: 'POST',
                                url: '../saveFullCVPers',
                                data: data,
                                success: function(result) {
                                    //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
                                    if (result.status == 200) {
                                        //alert("submitted with success 2");
                                    }

                                    console.log("ANUAL MEU")





                                },
                                error: function(data) { console.log("falha 2 ajax") }
                            });
                            if (result.status == 200) {
                                //alert("submitted with success 2");
                            }
                        },
                        error: function(data) { console.log("falha 2 ajax") }
                    });
                },
                error: function(data) { console.log("falha 1 ajax") }
            });
        }
    })
})
