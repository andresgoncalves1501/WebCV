//quando inicia a página faz
$(document).ready(function() {
    //chama a função para atualizar os users
    console.log("entrou no refresh");
    refreshWelcome();
    criarTabelaSubs();
});

function criarTabelaSubs() {
    //chamada ajax
    $.ajax({
        type: 'GET',
        url: '../criarTabelaSubs',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            //debugging para ver se foi pedido com sucesso
            console.log('success');
            //criação de uma tabela para demonstração dos resultados recebidos
            var txt = "";
            txt += "<table class='table' style='padding:10px; width:70%; margin:0% 15% 0% 15%'>";
            txt += "<thead class='thead-dark'>";
            txt += "<tr><th>Nome</th><th>Data_Nascimento</th><th>Profissao</th><th>Email</th><th>Cv/Visitar</th><th>Cv/Remover</th></tr></thead><tbody>";
            //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
            data.forEach(function(row) {
                txt += "<tr><td style='text-align:right'>" + row.nome_cliente + "</td><td>" + row.data_nascimento +
                    "</td><td>" + row.valor_linha + "</td><td>" + row.email + "</td><td class='view'><i class='fa fa-eye'></i></td><td class='remove'><i class='fa fa-remove'></i></td></tr>";
            });
            txt += "</tbody></table>";
            //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
            $("#result").html(txt);

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
                    error: function(dataID) { console.log("deu erro em ir buscar o id do cliente") }
                });


            })
            
            $(".remove").click(function() {
                //alert("clicou para apagar");

                var pessoa = $(this).prev().prev().text();
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
                                type: 'POST',
                                url: '../removerSub',
                                success: function(dataRemover) {
                                    console.log("A VER O REMOVER CV");
                                    //window.open(data10, "_self");
                                    //  var arrayMudarCorDiv = ["#1aves", "#2aves", "#3aves", "#4aves", "#5aves", "#6aves", "#7aves", "#8aves", "#9aves", "#10aves", "#11aves", "#12aves", "#13aves", "#14aves", "#15aves", "#16aves", "#17aves", "#aves1", "#aves2", "#aves3", "#aves4", "#aves5", "#aves6", "#aves7", "#aves8", "#aves9", "#aves10", "#aves11", "#aves12", "#aves13", "#aves14", "#aves15", "#aves16", "#aves17"];

                                    //  for(var i = 0; i < arrayMudarCorDiv.length; i++)
                                    //  {
                                    //      console.log("");
                                    //      $(arrayMudarCorDiv[i]).hide();
                                    //  }
                                    //window.open(data10);
                                    
                                    console.log(dataRemover)
                                    
                                    alert("O CV deste utilizador foi removido das suas subscrições")
                                },
                                error: function(dataRemover) { console.log("A VER SHORT CV deu erro") }
                            })
                        }


                    },
                    error: function(dataID) { alert("deu erro em ir buscar o id do cliente") }
                });


            })
        }
    });
}

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
                        //     console.log("i am sorry but it is too late - " + data5[x]);
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

$("#sessaoSubscricoes").click(function() {
    console.log("Controller terminar sessao SUBSCRICOES")
    $.ajax({
        type: 'POST',
        url: '../destruirSessao',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            window.open('/', '_self');
        }
    })
})