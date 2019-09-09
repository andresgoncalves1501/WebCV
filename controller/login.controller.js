var nome = "";

//quando inicia a página faz
$(document).ready(function() {
    //chama a função para atualizar os users
    console.log("entrou no refresh");
    refreshWelcome();
});

$('#formNewUser').validator().on('submit', function(event) {
    console.log("aaaf")

    if (event.isDefaultPrevented()) {
        alert("Possui erros no seu login") // handle the invalid form...
    }
    else {
        event.preventDefault();
        //carregamento dos dados do form para variável JS
        //como a chamada é feita do lado do cliente o carregamento é com jQuery
        var data = {};
        if (document.getElementById("company").checked == true) {
            console.log("rrr")
            data.account = document.getElementById("company").value;
        }
        else if (document.getElementById("individual").checked == true) {

            data.account = document.getElementById("individual").value;
        }
        data.email = $("#email").val();
        data.password = $("#password").val();

        //$("#formNewUser")[0].reset();
        console.log("chegou o login")

        console.log("login - " + data.account + " " + data.email + " " + data.password)

        $.ajax({
            type: 'POST',
            url: '../fazerLogin',
            data: data,
            success: function(data2) {
                console.log("ajax1 " + data.email)
                console.log("ajax2 " + data2)

                if (data2 == "nao") {
                    alert("Tipo de conta, e-mail ou palavra-pass incorretos");
                }
                else {
                    alert("Login efetuado");
                    $.ajax({
                        type: 'POST',
                        url: '../loginPost',
                        data: data,
                        success: function(data3) {
                            console.log("Controller do login é - " + data3[1])
                            //data3.forEach(function(row) {
                            //console.log("da por favorr: " + row.id)
                            //})
                            //document.getElementsByName('bem-vindo').html = data3;
                            //$("p[name='bem-vindo']").text(data3);
                            nome = data3[0];
                            //alert("Id guardado na session");

                            if (data3[1] == "individual") {
                                window.open('/mainIndividuo', '_self');
                            }
                            else if (data3[1] == "company") {
                                window.open('/mainEmpresa', '_self');
                            }
                            //window.location('/');
                        },
                        error: function(data) { console.log("oupaaa " + data.password) }
                    });
                }
            },
            error: function(data) { console.log("oupaaa " + data.password) }
        });
    }
});

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

$("#sessaoIndividuo").click(function() {
    console.log("Controller terminar sessao EMPRESA")
    $.ajax({
        type: 'POST',
        url: '../destruirSessao',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            window.open('/', '_self');
        }
    })
})

$("#sessaoEmpresa").click(function() {
    console.log("Controller terminar sessao EMPRESA")
    $.ajax({
        type: 'POST',
        url: '../destruirSessao',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            window.open('/', '_self');
        }
    })
})

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