$('#msform').validator().on('submit', function(event) {
    console.log("aaaf")

    if (event.isDefaultPrevented()) {
        alert("Possui erros ao registar") // handle the invalid form...
    }
    else {
        event.preventDefault();
        //carregamento dos dados do form para variável JS
        //como a chamada é feita do lado do cliente o carregamento é com jQuery
        //var tipo_user = "";
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
        data.name = $("#name").val();
        data.bday = $("#bday").val();
        data.address = $("#address").val();
        data.observations = $("#observations").val();

        console.log("testr" + data.account)

        //$("#formNewUser")[0].reset();
        console.log("chegou")


        $.ajax({
            type: 'POST',
            url: '../verificarMail',
            data: data,
            success: function(data2) {
                console.log("1 ajax" + data2)
                if(data2 == "nao")
                {
                    console.log(data2)
                    console.log("controller nao existe"+data.address)
                    $.ajax({
                    type: 'POST',
                    url: '../save',
                    data: data,
                    dataType: 'json',
                    success: function(result) {
                        console.log("2 ajax")
                        //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
                        if (result.status == 200) {
                            alert("O seu registo foi feito com sucesso");
                            console.log("sucesso, guardado")
                            window.open('/login', '_self');
                        }
                    },
                    error: function(data) { console.log("oupaaa " + data) }
                });
                }
                else
                {
                    alert("Email já existente")
                    console.log("controller existe")
                }
            },
            error: function(data) { console.log("doiss " + data) }
        });
    }

});
