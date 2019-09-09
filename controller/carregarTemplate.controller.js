$("#verShortCV").click(function() {
    $.ajax({
        type: 'GET',
        url: '../descobrirDocumentoShort',
        success: function(data) {
            if (data[0] == "sim") {
                $.ajax({
                    type: 'GET',
                    url: '../cvShort',
                    success: function(data10) {
                        window.open(data10, "_self");
                    },
                    error: function(data) {  }
                })
            }
            else if (data[0] == "nao") {
                alert("Não possui um ShortCV");
            }
        },
        error: function(data) {  }
    })
})

//quando inicia a página faz
$(document).ready(function() {
    
    
    
     $.ajax({
                                type: 'GET',
                                url: '../download',
                                success: function(data) {
                                   console.log( "maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +data)
                                   
                                   $('#descarrega').attr('download', '../uploads/'+ data +'.pdf');
                                   $('#descarrega').attr('href',  '../uploads/'+ data +'.pdf');

                                },
                                error: function(data) {  }
                            })


    $.ajax({
        type: 'GET',
        url: '../descobrirDocumentoShort',
        success: function(data) {

            var arrayKey = ["#profBod", "#cartaBod", "#carreiraBod", "#expBod", "#projBod", "#capacidadesBod", "#objetivosBod", "#infoBod"];

            $.ajax({
                type: 'GET',
                url: '../obterNomeEmailData',
                success: function(data4) {

                    var arrayDados = ["#nomeCab", "#dataCab", "#contactoCab"];
                    var count = 0;

                    for (var x in data4) {
                        for (var z in data4[x]) {
                            $(arrayDados[count]).html(data4[x][z]);

                            count++;
                        }
                    }
                },
                error: function(data) { }
            })

            for (var i = 0; i < arrayKey.length; i++) {
                console.log(data[i]);
                $(arrayKey[i]).html(data[i + 1]);
            }

            $.ajax({
                type: 'GET',
                url: '../tipoTemplate',
                success: function(data5) {
                    
                    if (data5 == "template1") {
                        
                        $("#cabeçalho").css("background-color", "rgb(52, 100, 112, 0.8)");
                        
                    }

                    else if (data5 == "template2") {
                        
                        $("#cabeçalho").css("background-color", "rgb(111, 73, 122, 0.8)");
                        
                    }

                    else if (data5 == "template3") {
                        
                        $("#cabeçalho").css("background-color", "rgb(37, 92, 55, 0.8)");
                        
                    }
                    
                },
                error: function(data) {  }
            })


        },
        error: function(data) {  }
    })
});

$("#vz").click(function() {

    $.ajax({
        type: 'GET',
        url: '../descobrirDocumentoFull',
        success: function(data) {

            if (data[0] == "sim") {

                $.ajax({
                    type: 'GET',
                    url: '../tipoTemplate',
                    success: function(data5) {

                        if (data5 == "nao") {
                            alert("Não possui nenhum template associado ao seu CV");
                        }
                        else {
                            $.ajax({
                                type: 'GET',
                                url: '../cvFull',
                                success: function(data) {
                                    window.open(data);


                                },
                                error: function(data) {  }
                            })
                        }
                    },
                    error: function(data) {  }
                })
            }
            else if (data[0] == "nao") {
                alert("Não possui um ShortCV");
            }
        },
        error: function(data) {  }
    })
})
