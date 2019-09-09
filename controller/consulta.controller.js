$(document).ready(function() {
    //chama a função para atualizar os users
    console.log("entrou no refresh");
    refreshWelcome();
    refreshProfissao();
    // refreshTrabalhos();

    $.ajax({
        type: 'GET',
        url: '../descobrirDocumentoShortEmpresa',
        success: function(data) {
            console.log("data do controller - " + data);

            var arrayKey = ["#profBod", "#cartaBod", "#carreiraBod", "#expBod", "#projBod", "#capacidadesBod", "#objetivosBod", "#infoBod"];

            for (var x in data) {
                console.log("Controller carregarTemplate - " + data[x]);
            }

            console.log("somebody - " + data[0]);

            $.ajax({
                type: 'GET',
                url: '../obterNomeEmailDataEmpresa',
                success: function(data4) {
                    console.log("Entrou no obterNomeEmailDataEmpresa TEMPLATE")
                    console.log("data do controller - " + data4);

                    var arrayDados = ["#nomeCab", "#dataCab", "#contactoCab"];
                    var count = 0;

                    for (var x in data4) {
                        //console.log("preencherDocumentoFull CONTROLLER - " + data2[x])
                        for (var z in data4[x]) {
                            console.log("snuff obterNomeEmailDataEmpresa - " + data4[x][z]);
                            console.log("shop suey obterNomeEmailDataEmpresa - " + arrayDados[z]);
                            console.log("axiim obterNomeEmailDataEmpresa - " + arrayDados[0]);
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

            for (var i = 0; i < arrayKey.length; i++) {
                console.log(data[i]);
                $(arrayKey[i]).html(data[i + 1]);
                console.log("olha - " + arrayKey[i] + " " + data[i + 1]);
            }

            $.ajax({
                type: 'GET',
                url: '../tipoTemplateEmpresa',
                success: function(data5) {
                    console.log("Entrou no tipoTemplateEmpresa TEMPLATE")
                    console.log("data do controller tipoTemplateEmpresa - " + data5);

                    // for(var x in data5)
                    // {
                    //     console.log("- " + data5[x]);
                    // }

                    // if (data5 == "nao") {
                    //     alert("Não possui nenhum template associado ao seu CV");
                    // }
                    // else {
                    //alert("mudar cor")

                    //var arrayMudarCor = ["#cabeçalho", "#head1", "#head2", "#head3", "#head4"];
                    //var arrayMudarCorDiv = ["#1aves", "#2aves", "#3aves", "#4aves", "#5aves", "#6aves", "#7aves", "#8aves", "#9aves", "#10aves", "#11aves", "#12aves", "#13aves", "#14aves", "#15aves", "#16aves", "#17aves"];
                    if (data5 == "template1") {
                        //alert("O seu template é o 1");


                        //for (var i = 0; i < arrayMudarCor.length; i++) {
                        //$(arrayMudarCor[i]).css("background-color", "rgb(52, 100, 112, 0.8)");
                        $("#cabeçalho").css("background-color", "rgb(52, 100, 112, 0.8)");
                        //}
                        // for (var i = 0; i < arrayMudarCorDiv.length; i++) {
                        //     $(arrayMudarCorDiv[i]).css("border-color", "rgba(52, 100, 112, 0.8)");
                        // }
                    }

                    else if (data5 == "template2") {
                        //alert("O seu template é o 2");

                        //for (var i = 0; i < arrayMudarCor.length; i++) {
                        //$(arrayMudarCor[i]).css("background-color", "rgba(111, 73, 122, 0.8)");
                        $("#cabeçalho").css("background-color", "rgb(111, 73, 122, 0.8)");
                        //}
                        // for (var i = 0; i < arrayMudarCorDiv.length; i++) {
                        //     $(arrayMudarCorDiv[i]).css("border-color", "rgba(111, 73, 122, 0.8)");
                        // }
                    }

                    else if (data5 == "template3") {
                        //alert("O seu template é o 3");

                        //for (var i = 0; i < arrayMudarCor.length; i++) {
                        //console.log("")
                        //$(arrayMudarCor[i]).css("background-color", "rgba(37, 92, 55, 0.8)");
                        $("#cabeçalho").css("background-color", "rgb(37, 92, 55, 0.8)");
                        //}
                        // for (var i = 0; i < arrayMudarCorDiv.length; i++) {
                        //     $(arrayMudarCorDiv[i]).css("border-color", "rgba(37, 92, 55, 0.8)");
                        // }
                    }

                },
                error: function(data) { console.log("obterNomeEmailDataEmpresa deu erro") }
            })


        },
        error: function(data) { console.log("descobrirDocumentoShortEmpresa deu erro") }
    })
});


//$('#Form_prof').validator().on('submit', function(event) {

$("#procurar_prof").click(function() {
    //alert("entrou na deteçao do clique")
    console.log("form")
    //console.log($("#Cb_prof: selected").text());
    //if (event.isDefaultPrevented()) {
    //alert("form with errors") // handle the invalid form...}
    //}
    //se estiver tudo bem
    //else {
    //event.preventDefault();
    //alert("")
    //carregamento dos dados do form para variávels JS
    var data = {};
    data.profissao = $("#Cb_prof").val();
    console.log("texto da cb = " + data.profissao)
    //debugging para ver os dados que foram enviados
    console.log("profissiao - " + data);
    //limpeza dos dados do form
    //chamada ajax para envio dos dados para o servior via POST
    // $.ajax({
    //     type: 'POST',
    //     url: '../ConsultaProfissao',
    //     data: data,
    //     dataType: 'JSON',
    //     success: function(result) {
    //         //analisa res.end que está no result e se o status for 200 envia um alerta
    //         if (result.status == 200) { 
    //             alert("submitted with success"); 

    //         }
    //     },
    //     error: function(data) { console.log(data) }
    // });
    $.ajax({
        type: 'POST',
        url: '../ConsultaProfissao',
        data: data,
        //os dados recebidos do model estão na variável data
        success: function(data) {
            //debugging para ver se foi pedido com sucesso
            //alert('');
            //criação de uma tabela para demonstração dos resultados recebidos
            var txt = "";
            //txt += " <div class='table-responsive'>"
            txt += " <table class='table' id='subs'>";
            txt += "<thead class='thead-dark'>";
            txt += "<tr>";
            txt += " <th>Nome</th>"
            txt += " <th>E-mail</th>"
            txt += " <th>Visitar Perfil</th>"
            txt += "</tr>";
            txt += "</thead>";
            txt += "<tbody>";
            //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
            data.forEach(function(row) {
                console.log("ola")
                txt += "<tr>";
                txt += "<td>" + row.nome_cliente + "</td>";
                txt += "<td>" + row.email + "</td>";
                txt += "<td class='view'><i class='fas fa-eye'></i></td>";
                txt += "</tr>";
            });
            txt += "</tbody></table>";
            //txt += "</div>"
            //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
            $("#tabela").html(txt);


            $(".view").click(function() {
                //alert("clicou para ver");

                var pessoa = $(this).prev().text();
                //console.log("o idddd - " + global.id);

                console.log("PEOPLE FROM YESTERDAY - " + pessoa);

                var pessoaID = 0;

                data.forEach(function(row) {
                    console.log("ola")
                    if (pessoa == row.email) {
                        console.log("O id é - " + row.id_cliente);
                        pessoaID = row.id_cliente;
                        //window.open("../views/cvFull.html");
                    }
                });

                console.log("pessoau - " + pessoaID)


                $.ajax({
                    type: 'POST',
                    url: '../getIdParaCliente',
                    data: JSON.stringify(pessoaID),
                    //os dados recebidos do model estão na variável data
                    success: function(dataID) {
                        //debugging para ver se foi pedido com sucesso
                        console.log('success');

                        if (dataID == pessoaID) {
                            console.log("é igualzinho");
                            $.ajax({
                                type: 'GET',
                                url: '../cvShortEmpresa',
                                success: function(data10) {
                                    console.log("A VER O SHORT CV EMPRESA");
                                    //window.open(data10, "_self");
                                    //  var arrayMudarCorDiv = ["#1aves", "#2aves", "#3aves", "#4aves", "#5aves", "#6aves", "#7aves", "#8aves", "#9aves", "#10aves", "#11aves", "#12aves", "#13aves", "#14aves", "#15aves", "#16aves", "#17aves", "#aves1", "#aves2", "#aves3", "#aves4", "#aves5", "#aves6", "#aves7", "#aves8", "#aves9", "#aves10", "#aves11", "#aves12", "#aves13", "#aves14", "#aves15", "#aves16", "#aves17"];

                                    //  for(var i = 0; i < arrayMudarCorDiv.length; i++)
                                    //  {
                                    //      console.log("");
                                    //      $(arrayMudarCorDiv[i]).hide();
                                    //  }
                                    window.open(data10);
                                },
                                error: function(data) { console.log("A VER SHORT CV deu erro") }
                            })
                        }


                    },
                    error: function(dataID) { alert("deu erro em ir buscar o id do cliente") }
                });


            })
        },
        error: function(data) { alert("deu erro a consulta") }
    });
    //}
})

//})


function refreshProfissao() {
    //chamada ajax
    $.ajax({
        type: 'GET',
        url: '../read',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            //debugging para ver se foi pedido com sucesso
            console.log('success');
            var profes = [];
            data.forEach(function(row) {
                profes.push(row.valor_linha);

                //  $("#Cb_prof").append('<option class="option" value = ' + row.valor_linha + '>' + row.valor_linha + ' </option>');
            })
            var profissoes = [];
            $.each(profes, function(i, el) {
                if ($.inArray(el, profissoes) === -1) profissoes.push(el);
            });
            console.log(profissoes)

            $.each(profissoes, function(i, el) {

                $("#Cb_prof").append('<option class="option" value = ' + profissoes[i] + '>' + profissoes[i] + ' </option>');
            })


            //$("#Cb_prof").html("");

            //for(var i = 0; i < profes.length; i++)

            //$.each(profes, function(val, text) {
            //console.log("vbvcvc")
            //$("#Cb_prof").append('<option> class="option" value = "' + val + "'> '" + text  + "' </option>')
            //});

            //criação de uma tabela para demonstração dos resultados recebidos
            // var txt = "";
            // //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
            // data.forEach(function(row) {
            //     console.log("ola")
            //     txt += "<option class='option' value=" + row.valor_linha + " >" + row.valor_linha + "</option>";
            // });
            // txt += "<input type='submit' id='procurar_prof' name='procurar' value='Procurar'>";
            // //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
            // $("#lol").html(txt);
        },
        error: function(data) { alert("deu erro ao carregar as profissoes para a combobox") }
    });
    //  $.ajax({
    //         type: 'GET',
    //         url: '../read',
    //         //os dados recebidos do model estão na variável data
    //         success: function(data) {
    //             //debugging para ver se foi pedido com sucesso
    //             console.log('success');
    //             var profes = [];
    //             data.forEach(function(row) {
    //                 profes.push(row.valor_linha);
    //             })
    //             $("#Cb_prof").html("")
    //             $.each(profes, function (val, text) {
    //             console.log("vbvcvc")
    //             $("#Cb_prof").append($('<option></option>').val(val).html(text))
    //                 });
    //             event.preventDefault();
    //         }
    //         });
}

// function refreshTrabalhos() {

//     var data = $("#Cb_prof").val();

//     console.log(" - " + data)

//     //chamada ajax
//     $.ajax({
//         type: 'POST',
//         url: '../ConsultaProfissao',
//         data: data,
//         //os dados recebidos do model estão na variável data
//         success: function(data) {
//             //debugging para ver se foi pedido com sucesso
//             console.log('success');
//             //criação de uma tabela para demonstração dos resultados recebidos
//             var txt = "";
//             txt += " <table class='table' id='subs'>";
//             txt += "<thead class='thead-dark'>";
//             txt += "<tr>";
//             txt += " <th>Nome</th>"
//             txt += "</thead>";
//             txt += "<tbody>";
//             //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
//             data.forEach(function(row) {
//                 console.log("ola")
//                 txt += " <tr><td style='text-align:right'>" + row.nome_cliente + "</td>";
//             });
//             txt += "</tbody></table>";
//             //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
//             $("#tabela").html(txt);
//         }
//     });
//}


$("#vz").click(function() {

    $.ajax({
        type: 'GET',
        url: '../descobrirDocumentoFullEmpresa',
        success: function(data) {
            console.log("data do controller - " + data);

            console.log("consolaaa - " + data[0]);

            if (data[0] == "sim") {
                console.log("Vai ver o Full CV");

                $.ajax({
                    type: 'GET',
                    url: '../tipoTemplateEmpresa',
                    success: function(data5) {
                        console.log("Entrou no tipoTemplateEmpresa TEMPLATE")
                        console.log("data do controller tipoTemplateEmpresa - " + data5);

                        // for(var x in data5)
                        // {
                        //     console.log(" - " + data5[x]);
                        // }

                        if (data5 == "nao") {
                            alert("O utilizador não possui nenhum template associado ao CV");
                        }
                        else {
                            //alert("oiaaa")

                            // var arrayMudarCor = ["#cabeçalho", "#head1", "#head2", "#head3", "#head4"];
                            // var arrayMudarCorDiv = ["#1aves", "#2aves", "#3aves", "#4aves", "#5aves"];
                            // if (data5 == "template1") {
                            //     alert("O seu template é o 1");


                            //     for (var i = 0; i < arrayMudarCor.length; i++) {
                            //         $(arrayMudarCor[i]).css("background-color", "rgb(52, 100, 112, 0.8)");
                            //     }
                            //     for (var i = 0; i < arrayMudarCorDiv.length; i++) {
                            //         $(arrayMudarCorDiv[i]).css("border-color", "rgb(52, 100, 112, 0.8)");
                            //     }
                            // }

                            // else if (data5 == "template2") {
                            //     alert("O seu template é o 2");

                            //     for (var i = 0; i < arrayMudarCor.length; i++) {
                            //         $(arrayMudarCor[i]).css("background-color", "rgba(212, 209, 53, 0.8)");
                            //     }
                            // }

                            // else if (data5 == "template3") {
                            //     alert("O seu template é o 3");

                            //     for (var i = 0; i < arrayMudarCor.length; i++) {
                            //         console.log("")
                            //         $(arrayMudarCor[i]).css("color", "rgba(37, 92, 55, 0.8)");
                            //     }
                            // }

                            $.ajax({
                                type: 'GET',
                                url: '../cvFullEmpresa',
                                success: function(data6) {
                                    console.log("data do controller CvFullEmpresa - " + data6);
                                    window.open(data6);


                                },
                                error: function(data6) { console.log("cvFullEmpresa deu erro") }
                            })
                        }



                        // if (data == "sim") {
                        //     console.log("Já possui um Full CV");


                        // }
                        // else if (data == "não") {
                        //     console.log("Ainda não possui nenhum tipo de Full CV");
                        // }
                    },
                    error: function(data) { console.log("obterNomeEmailDataEmpresa deu erro") }
                })
            }
            else if (data[0] == "nao") {
                console.log("Ainda não possui nenhum tipo de Short CV");

                alert("Este cliente ainda não possui um FullCV");
            }
        },
        error: function(data) { console.log("descobrirDocumentoFull deu erro") }
    })
})

$("#sb").click(function() {

    console.log("RUMO À POSITIVA");

    $.ajax({
        type: 'GET',
        url: '../verificarSubscricao',
        success: function(data) {
            console.log("Entrou no verificarSubscricao TEMPLATE")
            console.log("data do controller verificarSubscricao - " + data);

            if (data == "sim") {
                alert("Já subscreveu este CV");

            }
            else if (data == "nao") {
                //alert("Ainda não subscreveu este utilizador");

                $.ajax({
                    type: 'POST',
                    url: '../subscrever',
                    success: function(data2) {
                        console.log("Entrou no subscrever TEMPLATE")
                        console.log("data do controller subscrever - " + data2);

                        alert("Acabou de subscrever este utilizador");



                        //mail             
                        $.ajax({
                            type: 'GET',
                            url: '../EnviarEmailCliente',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function(result) {
                                //analisa res.end que está no result e se o status for 200 envia um alerta
                                if (result.status == 200) {
                                    //alert("submitted with success"); 
                                }

                                $.ajax({
                                    type: 'GET',
                                    url: '../EnviarNomeEmpresa',
                                    data: JSON.stringify(data),
                                    contentType: 'application/json',
                                    success: function(result) {
                                        //analisa res.end que está no result e se o status for 200 envia um alerta
                                        if (result.status == 200) {
                                            //alert("submitted with success"); 
                                        }


                                        $.ajax({
                                            type: 'GET',
                                            url: '../sendEmail',
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


                                    },
                                    error: function(data) { console.log("MUITOS ERROS") }
                                });



                            },
                            error: function(data) { console.log("MUITOS ERROS") }
                        });
                    },
                    error: function(data2) { console.log("obterNomeEmailDataEmpresa deu erro") }
                })
            }


        },
        error: function(data) { console.log("obterNomeEmailDataEmpresa deu erro") }
    })




})

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

$("#sessaoConsulta").click(function() {
    console.log("Controller terminar sessao CONSULTA")
    $.ajax({
        type: 'POST',
        url: '../destruirSessao',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            window.open('/', '_self');
        }
    })
})
