$("#cv_button").click(function (event){
    console.log("aaaf")
    
    event.preventDefault();
    //carregamento dos dados do form para variável JS
    //como a chamada é feita do lado do cliente o carregamento é com jQuery
    var data = {};
    data.profissao = $("#profissao").val();
    data.tipo_carta_conducao = $("#tipo_carta_conducao").val();
    data.carreira_academica = $("#carreira_academica").val();
    data.experiencia_profissional = $("#experiencia_profissional").val();
    data.projetos_realizados = $("#projetos_realizados").val();
    data.skills = $("#skills").val();
    data.objetivos = $("#objetivos").val();
    data.informacao_adicional = $("#informacao_adicional").val();
    
    console.log("testr"+data.profissao)
    console.log("testr"+data.tipo_carta_conducao)
    console.log("testr"+data.carreira_academica)
    console.log("gintonico")
    
    $.ajax({
        type: 'POST',
        url: '../saveCV',
        data: data,
        contenType: 'application/json',
        sucess: function (result) {
            console.log("ola")
            //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
            if(result.status == 200)
            {
                //alert("submitted with success");
                console.log("sucesso, guardado")
            }
        },
        error: function (data) {console.log(data)}
    });
});