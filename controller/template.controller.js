//quando inicia a página faz
$(document).ready(function() {
    //chama a função para atualizar os users
    console.log("entrou no refresh");

    $.ajax({
        type: 'GET',
        url: '../procurarTemplate',
        success: function(data) {
            //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
            // if (result.status == 200) {
            //     //alert("submitted with success 1");
            // }
            var template;

            console.log("Vinhaça - " + data[0]);

            data[1].forEach(function(row) {
                console.log("PROCURAR TEMPLATE CONTROLLER - " + row.id_documento);
                console.log("PROCURAR TEMPLATE CONTROLLER 2 - " + row.n_template);
                template = row.n_template;
            })

            if (data[0] == "nao") {
                console.log("NAO POSSUI UM TEMPLATE PROCURAR TEMPLATE")
            }
            if (data[0] == "sim") {
                $("#" + template + "").attr('checked', true);
            }


        },
        error: function(data) { console.log("Deu erro no procurarTemplate") }
    });


});


$("#gd2").click(function() {

    console.log("Clicou no botáo para guardar o template");

    var data = {};

    if (document.getElementById("template1").checked == true) {
        console.log("rrr")
        data.template = document.getElementById("template1").value;
    }
    else if (document.getElementById("template2").checked == true) {
        data.template = document.getElementById("template2").value;
    }
    else if (document.getElementById("template3").checked == true) {
        data.template = document.getElementById("template3").value;
    }

    console.log("lil - " + data.template)

    // data.profissao = $("#profissao").val();
    // data.carta = $("#tipo_carta_conducao").val();
    // data.academica = $("#carreira_academica").val();
    // data.profissional = $("#experiencia_profissional").val();
    // data.projetos = $("#projetos_realizados").val();
    // data.skills = $("#skills").val();
    // data.objetivos = $("#objetivos").val();
    // data.informacao = $("#informacao_adicional").val();

    // console.log("controller - " + data.profissao);
    // console.log("controller - " + data.carta);
    // console.log("controller - " + data.informacao);


    $.ajax({
        type: 'POST',
        url: '../guardarTemplate',
        data: data,
        success: function(result) {
            //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
            if (result.status == 200) {
                //alert("submitted with success 1");
            }
            alert("CV guardado com sucesso");
            window.open('/mainIndividuo', '_self');
        },
        error: function(data) { console.log("Deu erro no guardarTemplate") }
    });

})
