//quando inicia a página faz
$(document).ready(function() {
    //chama a função para atualizar os users
    console.log("Entrou no preencher do Short CV");

    refreshWelcome();
    //   uploadimg()

    $.ajax({
        type: 'GET',
        url: '../descobrirDocumentoShort',
        success: function(data) {
            console.log("data do controller - " + data);

            if (data[0] == "sim") {
                console.log("Já possui um Short CV");

                var arrayShort = ["#profissao", "#tipo_carta_conducao", "#carreira_academica", "#experiencia_profissional", "#projetos_realizados", "#skills", "#objetivos", "#informacao_adicional"]

                var count = 0;
                var count2 = 0;

                for (var x in data) {
                    console.log("puta - " + data[x]);
                    console.log("count - " + arrayShort[count]);

                    if (count2 >= 1) {
                        $(arrayShort[count]).val(data[x]);
                        count++;
                    }
                    count2++;

                }
            }
            else if (data[0] == "não") {
                console.log("Ainda não possui nenhum tipo de Short CV")
            }
        },
        error: function(data) { console.log("descobrirDocumentoFull deu erro") }
    })
});


$("#gd").click(function() {

    var data = {};

    data.profissao = $("#profissao").val();
    data.carta = $("#tipo_carta_conducao").val();
    data.academica = $("#carreira_academica").val();
    data.profissional = $("#experiencia_profissional").val();
    data.projetos = $("#projetos_realizados").val();
    data.skills = $("#skills").val();
    data.objetivos = $("#objetivos").val();
    data.informacao = $("#informacao_adicional").val();
    //data.img =  $("#file-to-upload").originalname;

    console.log("controller - " + data.profissao);
    console.log("controller - " + data.carta);
    console.log("controller - " + data.informacao);

    $.ajax({
        type: 'GET',
        url: '../obterIdDocumentos',
        success: function(result) {
            $.ajax({
                type: 'POST',
                url: '../saveDocument',
                data: data,
                success: function(result) {
                    //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
                    if (result.status == 200) {
                        //alert("submitted with success 1");
                    }

                    $.ajax({
                        type: 'POST',
                        url: '../saveShortCV',
                        data: data,
                        dataType: 'json',
                        success: function(result) {
                            //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
                            if (result.status == 200) {
                                //alert("Id guardado na session");
                            }

                            //maillllllllllllll
                            $.ajax({
                                type: 'GET',
                                url: '../EnviarEmailEmpresas',
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
                                            url: '../EnviarEmail',
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
                                type: 'GET',
                                url: '../descobrirDocumentoFull',
                                success: function(data) {
                                    console.log("data do controller TEMPLATE - " + data);

                                    console.log("contil - " + data[0]);
                                    console.log("contil2 - " + data[1]);

                                    if (data[0] == "sim") {
                                        console.log("Já possui um Full CV TEMPLATE");

                                        if (data[1] == "Full_cv_livre") {

                                            console.log("O cv é full_cv_livre TEMPLATE - o controller");

                                            $.ajax({
                                                type: 'GET',
                                                url: '../preencherDocumentoFull',
                                                success: function(data2) {
                                                    console.log("Entrou no preencherDocumentoFull TEMPLATE")
                                                    console.log("data do controller - " + data2);

                                                    $('#bodyCVLivre').show();
                                                    $('#bodyCVPers').hide();

                                                    var arrayFullLivre = ["#carreira_academicaFull", "#experiencia_profissionalFull", "#projetos_npro_realizadosFull", "#projetos_pro_realizadosFull", "#skillsFull", "#objetivosFull", "#informacao_adicionalFull"];
                                                    var count = 0;
                                                    var count1 = 0;

                                                    for (var x in data2) {
                                                        //console.log("preencherDocumentoFull CONTROLLER - " + data2[x]);
                                                        for (var z in data2[x]) {
                                                            if (count >= 2) {
                                                                console.log("snuff - " + data2[x][z]);
                                                                console.log("shop suey - " + arrayFullLivre[z]);
                                                                console.log("axiim - " + arrayFullLivre[0]);
                                                                $(arrayFullLivre[count1]).val(data2[x][z]);
                                                                console.log($(arrayFullLivre[count1]).val(data2[x][z]));
                                                                count1++;
                                                            }
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
                                                error: function(data) { console.log("preencherDocumentoFull deu erro") }
                                            })
                                        }
                                        else if (data[1] == "Full_cv_personalizado") {
                                            console.log("O cv é full_cv_personalizado TEMPLATE - o controller");

                                            $.ajax({
                                                type: 'GET',
                                                url: '../preencherDocumentoFullPers',
                                                success: function(data3) {
                                                    console.log("Entrou no preencherDocumentoFullPers TEMPLATE")
                                                    console.log("data do controller - " + data3);

                                                    $('#bodyCVLivre').hide();
                                                    $('#bodyCVPers').show();

                                                    var arrayFullPers = ["#ens1", "#cur1", "#aiens1", "#afens1", "#notf1", "#ens2", "#cur2", "#aiens2", "#afens2", "#notf2", "#ens3", "#cur3", "#aiens3", "#afens3", "#notf3", "#mais_info_academica", "#emp1", "#aiemp1", "#afemp1", "#prof1", "#emp2", "#aiemp2", "#afemp2", "#prof2", "#emp3", "#aiemp3", "#afemp3", "#prof3", "#mais_info_profissional", "#nomnpro1", "#temnpro1", "#ainpro1", "#afnpro1", "#urlnpro1", "#nomnpro2", "#temnpro2", "#ainpro2", "#afnpro2", "#urlnpro2", "#nomnpro3", "#temnpro3", "#ainpro3", "#afnpro3", "#urlnpro3", "#nompro1", "#tempro1", "#aipro1", "#afpro1", "#urlpro1", "#nompro2", "#tempro2", "#aipro2", "#afpro2", "#urlpro2", "#nompro3", "#tempro3", "#aipro3", "#afpro3", "#urlpro3", "#capacidadesPers", "#objetivosPers", "#informacao_adicionalPers"];
                                                    var count2 = 0;
                                                    var count3 = 0;

                                                    for (var x in data3) {
                                                        console.log("preencherDocumentoFull CONTROLLER TEMPLATE - " + data3[x])
                                                        for (var z in data3[x]) {

                                                            if (count2 >= 2) {
                                                                console.log("snuff - " + data3[x][z]);
                                                                console.log("shop suey - " + arrayFullPers[z]);
                                                                console.log("axiim - " + arrayFullPers[0]);
                                                                $(arrayFullPers[count3]).val(data3[x][z]);
                                                                console.log($(arrayFullPers[count3]).val(data3[x][z]));
                                                                count3++;
                                                            }

                                                            count2++;

                                                        }
                                                    }
                                                },
                                                error: function(data) { console.log("preencherDocumentoFullPers deu erro") }
                                            })
                                        }
                                    }
                                    else if (data[0] == "nao") {
                                        console.log("Ainda não possui nenhum tipo de Full CV TEMPLATE");
                                        //window.alert("Nao tem");
                                    }
                                },
                                error: function(data) { console.log("descobrirDocumentoFull deu erro") }
                            })

                        },
                        error: function(data) { console.log("oupaaa " + data.password) }
                    });
                },
                error: function(data) { console.log("doiss " + data.objetivos) }
            });

            if (result.status == 200) {
                //alert("submitted with success 0");
            }
        },
        error: function(data) { console.log("Quero morrer") }
    });


})
// $('#img_upload').click(function() {
//      var data ={};
//      data.file = $("#file-to-upload").attr('name')
//             $.ajax({
//                             type: 'POST',
//                             url: '../imagem',
//                             data: data,
//                             success: function(result) {
//                                 console.log("PDF CONTROLLER")
//                                 console.log(result)
//                             },
//                             error: function(result) { console.log("pdf lollllllllllllllllll") }
//                         })
// })
$('#img_upload').click(function() {
    var form = $('#uploadForm')[0];
    var data = new FormData(form);

    //var formData = new FormData();
    /*formData.append('firstname', $('input[name=firstname]').val());
    formData.append('lastname', $('input[name=lastname]').val());
    formData.append('email', $('input[name=email]').val());
    formData.append('phone',$('input[name=phone]').val());
    formData.append('resume', $('input[type=file]').file);*/


    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/upload/application",
        data: data,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        success: (data) => {

            console.log("imagem")
        },
        error: (e) => {
            $("#confirmMsg").text(e.responseText);
        }
    });
})
// $('#uploadForm').validator().on('submit', function(event) {
//     //se submeter com erros
//     console.log("form")
//     console.log($('#imgInp').val() + "diz ola")

//     if (event.isDefaultPrevented()) {
//         alert("form with errors") // handle the invalid form...}
//     }
//     //se estiver tudo bem
//     else {
//         event.preventDefault();
//         //carregamento dos dados do form para variávels JS
//         var data = {};
//         data.photo = $('#imgInp').val();
//         //debugging para ver os dados que foram enviados
//         console.log(data);
//         //limpeza dos dados do form
//         $('#uploadForm')[0].reset();
//         //chamada ajax para envio dos dados para o servior via POST
//         $.ajax({
//             type: 'POST',
//             url: './file/upload',
//             data: JSON.stringify(data),
//             contentType: 'application/json',
//             success: function(result) {
//                 //analisa res.end que está no result e se o status for 200 envia um alerta
//                 if (result.status == 200) { alert("submitted with success"); }
//             },
//             error: function(data) { console.log(data) }
//         });
//     }
// });

function refreshWelcome() {
    console.log("super ligaaaaaa")
    //chamada ajax
    $.ajax({
        type: 'POST',
        url: '../loginPost',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            console.log("hello data - " + data[0])
            $("p[name='bem-vindo']").text("Bem-vindo ao WebCV, " + data[0] + "!");
        }
    });
}

$("#sessaoCV").click(function() {
    console.log("Controller terminar sessao CV")
    $.ajax({
        type: 'POST',
        url: '../destruirSessao',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            window.open('/', '_self');
        }
    })
})
