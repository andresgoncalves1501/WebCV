function criarTabelaSubs(callback)
{
    
    var query = "SELECT valor_linha, nome_cliente, cliente.data_nascimento, cliente.email, cliente.id_cliente from cliente, linha, documento, documento_empresa, empresa where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and documento.id_documento = documento_empresa.id_documento and documento_empresa.id_empresa = empresa.id_empresa and documento_empresa.id_empresa = '" + global.id + "' and linha.desc_linha = '" + "profissao" + "'";
    console.log("query subs - " + query)
     global.connect.con.query(query, function(err, rows, fields){
        console.log(query.sql);
        if(!err)
        {
            console.log("deu - " + rows);
            callback(null, rows);
        }
        else
        {
            console.log("Error while performing Query.", err);
        }
        
    })
}

function removerSub(callback)
{
    
    var query = "DELETE FROM documento_empresa where id_empresa = " + global.id + " and id_documento = (SELECT documento.id_documento from documento where id_cliente = " + global.idDaPessoaComCV + " and desc_documento = '" + "Short_cv" + "')";
    console.log("query subs - " + query);
     global.connect.con.query(query, function(err, rows, fields){
        console.log(query.sql);
        if(!err)
        {
            console.log("deu - " + rows);
            callback(null, "apagado");
        }
        else
        {
            console.log("Error while performing Query.", err);
        }
        
    })
}
module.exports = {
    criarTabelaSubs:criarTabelaSubs,
    removerSub: removerSub
}