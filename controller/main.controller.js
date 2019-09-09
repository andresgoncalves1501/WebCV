$('#formMail').validator().on('submit', function(event) {
    //se submeter com erros
    console.log("form")
    console.log($('#texto').val());
    console.log($('#assunto').val());
    console.log($('#email').val());
    if (event.isDefaultPrevented()) {
        //alert("form with errors") // handle the invalid form...}
    }
    //se estiver tudo bem
    else {
        event.preventDefault();
        //carregamento dos dados do form para variávels JS
        var data = {};
        data.texto = $('#texto').val();
        data.assunto = $('#assunto').val();
        data.email = $('#email').val();
        //debugging para ver os dados que foram enviados
        console.log(data);
        //limpeza dos dados do form
        $('#formMail')[0].reset();
        //chamada ajax para envio dos dados para o servior via POST
        $.ajax({
            type: 'POST',
            url: './sendEmail',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                //analisa res.end que está no result e se o status for 200 envia um alerta
                if (result.status == 200) { 
                    //alert("submitted with success"); 
                }
            },
            error: function(data) { console.log(data) }
        });
    }
});