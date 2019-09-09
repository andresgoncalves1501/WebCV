function preencherDocumentoFullTemplateEmpresa(callback) {

    console.log("essa tal de marilu Empresa");

    var query = global.connect.con.query("SELECT valor_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and documento.id_documento = (SELECT id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.idDaPessoaComCV + " and desc_documento = '" + "Full_cv_livre" + "')", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            console.log("preencherDocumentoFull");

            callback(null, rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

function preencherDocumentoFullPersTemplateEmpresa(callback) {

    console.log("essa tal de marilu 2");

    var query = global.connect.con.query("SELECT valor_coluna from cliente, documento, linha, coluna where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and linha.id_linha = coluna.id_linha and linha.id_linha in (SELECT linha.id_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and documento.id_documento = " + global.IDdocumento + ")", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            console.log("preencherDocumentoFullPers");

            callback(null, rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

function descobrirDocumentoFullTemplateEmpresa(callback) {
    var query = global.connect.con.query("SELECT desc_documento, id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.idDaPessoaComCV + " and desc_documento like '" + "%Full%" + "'", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            var existeDocumentoFull = "";
            var arrayExisteDocumentoFull = [];

            if (rows.length == 0) {
                existeDocumentoFull = "nao";
                console.log("existeDocumentoFull - " + existeDocumentoFull);
            }
            else {
                existeDocumentoFull = "sim";
                console.log("existeDocumentoFull - " + existeDocumentoFull);
            }
            console.log("Number of records inserted: " + rows.affectedRows);
            arrayExisteDocumentoFull.push(existeDocumentoFull);
            arrayExisteDocumentoFull.push(rows);
            callback(null, arrayExisteDocumentoFull);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

//exportar as funções
module.exports = {
    preencherDocumentoFullTemplateEmpresa: preencherDocumentoFullTemplateEmpresa,
    preencherDocumentoFullPersTemplateEmpresa: preencherDocumentoFullPersTemplateEmpresa,
    descobrirDocumentoFullTemplateEmpresa: descobrirDocumentoFullTemplateEmpresa
}
