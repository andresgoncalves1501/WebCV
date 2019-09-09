//quando inicia a página faz
$(document).ready(function() {
    //chama a função para atualizar os users
    console.log("Entrou no preencher do Short CV visualizar");

    $.ajax({
        type: 'GET',
        url: '../descobrirDocumentoFullTemplate',
        success: function(data) {
            console.log("data do controller TEMPLATE - " + data);

            console.log("contil - " + data[0]);
            console.log("contil2 - " + data[1]);

            $.ajax({
                type: 'GET',
                url: '../obterNomeEmailData',
                success: function(data4) {
                    console.log("Entrou no obterNomeEmailData TEMPLATE")
                    console.log("data do controller - " + data4);

                    var arrayDados = ["#nome", "#data_nascimento", "#email"];
                    var count = 0;

                    for (var x in data4) {
                        //console.log("preencherDocumentoFull CONTROLLER - " + data2[x])
                        for (var z in data4[x]) {
                            console.log("snuff obterNomeEmailData - " + data4[x][z]);
                            console.log("shop suey obterNomeEmailData - " + arrayDados[z]);
                            console.log("axiim obterNomeEmailData - " + arrayDados[0]);
                            $(arrayDados[count]).html(data4[x][z]);
                            console.log($(arrayDados[count]).val(data4[x][z]));

                            count++;
                        }
                    }

                    // if (data == "sim") {
                    //     console.log("Já possui um Full CV");


                    // }
                    // else if (data == "não") {
                    //     console.log("Ainda não possui nenhum tipo de Full CV");
                    // }
                },
                error: function(data) { console.log("obterNomeEmailData deu erro") }
            })

            if (data[1] == "Full_cv_livre") {

                console.log("O cv é full_cv_livre TEMPLATE - o controller");

                $.ajax({
                    type: 'GET',
                    url: '../preencherDocumentoFullTemplate',
                    success: function(data2) {
                        console.log("Entrou no preencherDocumentoFull TEMPLATE")
                        console.log("data do controller - " + data2);

                        $('#bodyCVLivre').show();
                        $('#bodyCVPers').hide();

                        var arrayFullLivre = ["#profBodyCVLivre", "#ccBodyCVLivre", "#caBodyCVLivre", "#epBodyCVLivre", "#prNBodyCVLivre", "#prBodyCVLivre", "#capBodyCVLivre", "#objBodyCVLivre", "#iaBodyCVLivre"];
                        var count = 0;

                        for (var x in data2) {
                            //console.log("preencherDocumentoFull CONTROLLER - " + data2[x])
                            for (var z in data2[x]) {
                                console.log("snuff - " + data2[x][z]);
                                console.log("shop suey - " + arrayFullLivre[z]);
                                console.log("axiim - " + arrayFullLivre[0]);
                                $(arrayFullLivre[count]).html(data2[x][z]);
                                console.log($(arrayFullLivre[count]).val(data2[x][z]));

                                count++;
                            }
                        }
                        $.ajax({
                            type: 'POST',
                            url: '../Criarpdf',
                            success: function(dataQQ) {
                                console.log("PDF CONTROLLERrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                                console.log(dataQQ)
                            },
                            error: function(dataQQ) { console.log("pdf lollllllllllllllllll") }
                        })

                        if (data == "sim") {
                            console.log("Já possui um Full CV");


                        }
                        else if (data == "não") {
                            console.log("Ainda não possui nenhum tipo de Full CV");
                        }
                    },
                    error: function(data) { console.log("preencherDocumentoFull deu erro") }
                })
            }
            else if (data[1] == "Full_cv_personalizado") {
                console.log("O cv é full_cv_personalizado TEMPLATE - o controller");

                $.ajax({
                    type: 'GET',
                    url: '../preencherDocumentoFullPersTemplate',
                    success: function(data3) {
                        console.log("Entrou no preencherDocumentoFullPers TEMPLATE")
                        console.log("data do controller - " + data3);

                        $('#bodyCVLivre').hide();
                        $('#bodyCVPers').show();

                        var arrayFullPers = ["#profBodyCVPers", "#ccBodyCVPers", "#ens1t", "#cur1t", "#aiens1t", "#afens1t", "#notf1t", "#ens2t", "#cur2t", "#aiens2t", "#afens2t", "#notf2t", "#ens3t", "#cur3t", "#aiens3t", "#afens3t", "#notf3t", "#caBodyCVPers1", "#emp1t", "#aiemp1t", "#afemp1t", "#prof1t", "#emp2t", "#aiemp2t", "#afemp2t", "#prof2t", "#emp3t", "#aiemp3t", "#afemp3t", "#prof3t", "#epBodyCVPers1", "#nomnpro1t", "#temnpro1t", "#ainpro1t", "#afnpro1t", "#urlnpro1t", "#nomnpro2t", "#temnpro2t", "#ainpro2t", "#afnpro2t", "#urlnpro2t", "#nomnpro3t", "#temnpro3t", "#ainpro3t", "#afnpro3t", "#urlnpro3t", "#nompro1t", "#tempro1t", "#aipro1t", "#afpro1t", "#urlpro1t", "#nompro2t", "#tempro2t", "#aipro2t", "#afpro2t", "#urlpro2t", "#nompro3t", "#tempro3t", "#aipro3t", "#afpro3t", "#urlpro3t", "#capBodyCVPers", "#objBodyCVPers", "#iaBodyCVPers"];
                        var count2 = 0;

                        for (var x in data3) {
                            //console.log("preencherDocumentoFull CONTROLLER TEMPLATE - " + data3[x])
                            for (var z in data3[x]) {
                                //console.log(" " + data3[x][z])

                                console.log("snuff - " + data3[x][z]);
                                //console.log("" + arrayFullPers[z]);
                                console.log("axiim - " + arrayFullPers[count2]);
                                $(arrayFullPers[count2]).html(data3[x][z]);
                                //console.log($(arrayFullPers[count2]).text(data3[x][z]));
                                count2++;

                            }
                        }
                        $.ajax({
                            type: 'POST',
                            url: '../Criarpdf',
                            success: function(dataQQ) {
                                console.log("PDF CONTROLLERrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                                console.log(dataQQ)
                            },
                            error: function(dataQQ) { console.log("pdf lollllllllllllllllll") }
                        })




                    },
                    error: function(data) { console.log("preencherDocumentoFullPers deu erro") }
                })
            }
        },
        error: function(data) { console.log("descobrirDocumentoFull deu erro") }
    })

    $.ajax({
        type: 'GET',
        url: '../tipoTemplate',
        success: function(data5) {
            console.log("Entrou no tipoTemplate TEMPLATE")
            console.log("data do controller tipoTemplate - " + data5);

            // for(var x in data5)
            // {
            //     console.log("i am sorry but it is too late - " + data5[x]);
            // }

            // if (data5 == "nao") {
            //     alert("Não possui nenhum template associado ao seu CV");
            // }
            // else {
            //alert("mudar cor")

            var arrayMudarCor = ["#cabeçalho", "#head1", "#head2", "#head3", "#head4"];
            var arrayMudarCorDiv = ["#1aves", "#2aves", "#3aves", "#4aves", "#5aves", "#6aves", "#7aves", "#8aves", "#9aves", "#10aves", "#11aves", "#12aves", "#13aves", "#14aves", "#15aves", "#16aves", "#17aves"];
            if (data5 == "template1") {
                //alert("O seu template é o 1");


                for (var i = 0; i < arrayMudarCor.length; i++) {
                    $(arrayMudarCor[i]).css("background-color", "rgb(52, 100, 112, 0.8)");
                }
                for (var i = 0; i < arrayMudarCorDiv.length; i++) {
                    $(arrayMudarCorDiv[i]).css("border-color", "rgba(52, 100, 112, 0.8)");
                }
            }

            else if (data5 == "template2") {
                //alert("O seu template é o 2");

                for (var i = 0; i < arrayMudarCor.length; i++) {
                    $(arrayMudarCor[i]).css("background-color", "rgba(111, 73, 122, 0.8)");
                }
                for (var i = 0; i < arrayMudarCorDiv.length; i++) {
                    $(arrayMudarCorDiv[i]).css("border-color", "rgba(111, 73, 122, 0.8)");
                }
            }

            else if (data5 == "template3") {
                //alert("O seu template é o 3");

                for (var i = 0; i < arrayMudarCor.length; i++) {
                    console.log("senhor dos aneis")
                    $(arrayMudarCor[i]).css("background-color", "rgba(37, 92, 55, 0.8)");
                }
                for (var i = 0; i < arrayMudarCorDiv.length; i++) {
                    $(arrayMudarCorDiv[i]).css("border-color", "rgba(37, 92, 55, 0.8)");
                }
            }



            // global.request({
            //     method: "POST",
            //     url: 'http://api.pdflayer.com/api/convert',
            //     qs: {
            //         access_key: 'b943248e87b05251fa20d9f43ede36ba',
            //         page_size: 'A4',
            //         test: '1'
            //     },
            //     headers: {
            //         'content-type': 'application/x-www-form-urlencoded'
            //     },
            //     form: { document_url: "../views/cvFull.html", '': '' },
            //     encoding: null
            // }, function(error, response, body) {
            //     if (error) {
            //         throw error
            //     }
            //     else {
            //         console.log(body); // `body` is a Buffer because we told Request
            //         // to not make it a string
            //         var stream = global.fs.createWriteStream('../uploads/ola.pdf');
            //         stream.once('open', function(fd) {
            //             stream.write(body);
            //             stream.end();
            //         });

            //         console.log('File written')


            //         return;
            //     }
            // })
            //}



            // if (data == "sim") {
            //     console.log("Já possui um Full CV");


            // }
            // else if (data == "não") {
            //     console.log("Ainda não possui nenhum tipo de Full CV");
            // }
        },
        error: function(data) { console.log("obterNomeEmailData deu erro") }
    })

    // function allowDrop(ev) {
    //     ev.preventDefault();
    // }

    // function drag(ev) {
    //     ev.dataTransfer.setData("text", ev.target.id);
    // }

    // function drop(ev) {
    //     ev.preventDefault();
    //     var data = ev.dataTransfer.getData("text");
    //     ev.target.appendChild(document.getElementById(data));
    // }
});
