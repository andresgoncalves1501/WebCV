function preencherDocumentoFullTemplate(callback) {

    console.log("essa tal de marilu");

    var query = global.connect.con.query("SELECT valor_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and documento.id_documento = (SELECT id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.id + " and desc_documento = '" + "Full_cv_livre" + "')", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            console.log("entraaaaaaa");
            console.log("preencherDocumentoFull");

            callback(null, rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

function preencherDocumentoFullPersTemplate(callback) {

    console.log("essa tal de marilu 2");

    var query = global.connect.con.query("SELECT valor_coluna from cliente, documento, linha, coluna where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and linha.id_linha = coluna.id_linha and linha.id_linha in (SELECT linha.id_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and documento.id_documento = " + global.IDdocumento + ")", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            console.log("entraaaaaaa");
            console.log("preencherDocumentoFullPers");

            callback(null, rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

function obterNomeEmailData(callback) {
    console.log("essa tal de marilu 3");

    var query = global.connect.con.query("SELECT nome_cliente, data_nascimento, email from cliente where cliente.id_cliente = " + global.id + "", function(err, rows, fields) {
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

function descobrirDocumentoFullTemplate(callback) {
    var query = global.connect.con.query("SELECT desc_documento, id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.id + " and desc_documento like '" + "%Full%" + "'", function(err, rows, fields) {
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

var possuiTemplate = "";

var arrayPossuirTemplate = [];

function tipoTemplate(callback) {
    var query = global.connect.con.query("SELECT n_template from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.id + " and desc_documento like '" + "%Full%" + "'", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            // if (rows.length == 0) {
            //     possuiTemplate = "nao";
            //     console.log("existeDocumentoFull - " + possuiTemplate);
            // }
            // else {
            //     possuiTemplate = "sim";
            //     console.log("existeDocumentoFull - " + possuiTemplate);
            // }
            // console.log("Number of records inserted: " + rows.affectedRows);
            // arrayPossuirTemplate.push(possuiTemplate);
            //arrayPossuirTemplate.push(rows);
            //callback(null, arrayPossuirTemplate);
            callback(null, rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

//exportar as funções
module.exports = {
    preencherDocumentoFullTemplate: preencherDocumentoFullTemplate,
    preencherDocumentoFullPersTemplate: preencherDocumentoFullPersTemplate,
    obterNomeEmailData: obterNomeEmailData,
    descobrirDocumentoFullTemplate: descobrirDocumentoFullTemplate,
    tipoTemplate: tipoTemplate
}
