function getTrabalho(trabalho, callback) {
    console.log("O model do get trabalho funciona")
    var query2 = global.connect.con.query("SELECT nome_cliente, cliente.id_cliente, email from cliente,linha,documento where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and desc_linha = 'profissao' and valor_linha like '%" + trabalho + "%'", function(err, rows, fields) {
        console.log(query2.sql);
        if (!err) {
            console.log("deu getTrabalho - " + rows);
            callback(null, rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }

    })
}

function getProfissao(callback) {
    var query2 = global.connect.con.query("SELECT valor_linha from cliente,documento,linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and  desc_linha = 'profissao' ", function(err, rows, fields) {
        console.log(query2.sql);
        if (!err) {
            console.log("deu - " + rows);
            callback(null, rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

//var existeDocumentoShort = "";
//var arrayExisteDocumentoShort = [];

function descobrirDocumentoShortEmpresa(callback) {
    console.log("descobrirDocumentoShort MODEL");
    var query = global.connect.con.query("SELECT documento.id_documento, valor_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and documento.id_documento = (SELECT id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.idDaPessoaComCV + " and desc_documento = '" + "Short_cv" + "')", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            // if (rows.length == 0) {
            //     existeDocumentoShort = "nao";
            //     console.log("existeDocumentoShort - " + existeDocumentoShort);
            // }
            // else {
            //     existeDocumentoShort = "sim";
            //     console.log("existeDocumentoShort - " + existeDocumentoShort);
            // }
            console.log("Number of records inserted: " + rows.affectedRows);
            //arrayExisteDocumentoShort.push(existeDocumentoShort);
            //arrayExisteDocumentoShort.push(rows);
            //callback(null, arrayExisteDocumentoShort);
            callback(null, rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

function obterNomeEmailDataEmpresa(callback) {
    console.log("essa tal de marilu 3");

    var query = global.connect.con.query("SELECT nome_cliente, data_nascimento, email from cliente where cliente.id_cliente = " + global.idDaPessoaComCV + "", function(err, rows, fields) {
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

function tipoTemplateEmpresa(callback) {
    var query = global.connect.con.query("SELECT n_template from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.idDaPessoaComCV + " and desc_documento like '" + "%Full%" + "'", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            console.log("entraaaaaaa")
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


function descobrirDocumentoFullEmpresa(callback) {
    var query = global.connect.con.query("SELECT desc_documento, id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.idDaPessoaComCV + " and desc_documento like '" + "%Full%" + "'", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            console.log("entraaaaaaa")
            var existeDocumentoFull = "";
            var arrayExisteDocumentoFull = [];
            
            if (rows.length == 0) {
                existeDocumentoFull = "nao";
                console.log("existeDocumentoFull Empresa - " + existeDocumentoFull);
            }
            else {
                existeDocumentoFull = "sim";
                console.log("existeDocumentoFull Empresa - " + existeDocumentoFull);
            }
            console.log("Number of records inserted: " + rows.affectedRows);
            arrayExisteDocumentoFull.push(existeDocumentoFull);
            arrayExisteDocumentoFull.push(rows);
            callback(null, arrayExisteDocumentoFull);
            arrayExisteDocumentoFull = [];
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}


function verificarSubscricao(callback) {
    var query = global.connect.con.query("SELECT documento.id_documento from empresa, documento_empresa, documento where empresa.id_empresa = documento_empresa.id_empresa and documento_empresa.id_documento = documento.id_documento and empresa.id_empresa = " + global.id + " and documento.id_documento = '" + global.idShortEmpresa + "'", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            console.log("entraaaaaaa")
            var existeSubscricao = "";
            
            if (rows.length == 0) {
                existeSubscricao = "nao";
                console.log("existeSubscricao Empresa - " + existeSubscricao);
            }
            else {
                existeSubscricao = "sim";
                console.log("existeSubscricao Empresa - " + existeSubscricao);
            }
            console.log("Number of records inserted: " + rows.affectedRows);
            // arrayExisteDocumentoFull.push(existeDocumentoFull);
            // arrayExisteDocumentoFull.push(rows);
            // callback(null, arrayExisteDocumentoFull);
            callback(null, existeSubscricao);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}

function subscrever(callback) {
    var query = global.connect.con.query("INSERT INTO documento_empresa (id_documento, id_empresa) VALUES ('" + global.idShortEmpresa + "', '" + global.id + "')", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            console.log("entraaaaaaa subscrever")
            console.log("Number of records inserted: " + rows.affectedRows);

            callback(null, "subscrito")
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}
function getEmailCliente(callback)
{
    var query = global.connect.con.query("SELECT email from cliente where id_cliente = " + global.idDaPessoaComCV + "", function(err, rows, fields) {
    
     if (!err) {
         console.log("Clienteeeeeeeeeeeeeeeeeee" + rows)
         
         callback(null,rows)
     }
     else
     {
         console.log("Error while performing Query.", err);
     }
    })
}
function getNomeEmpresa(callback)
{
    var query2 = global.connect.con.query("SELECT empresa.nome_empresa as nome_empresa from empresa where id_empresa = " + global.id + "", function(err, rows, fields) {
        
        if (!err) {
         console.log("Clienteeeeeeeeeeeeeeeeeee" + rows)
         
         callback(null,rows)
     }
     else
     {
         console.log("Error while performing Query.", err);
     }
    })
    
}

module.exports = {
    getTrabalho: getTrabalho,
    getProfissao: getProfissao,
    descobrirDocumentoShortEmpresa: descobrirDocumentoShortEmpresa,
    obterNomeEmailDataEmpresa: obterNomeEmailDataEmpresa,
    tipoTemplateEmpresa: tipoTemplateEmpresa,
    descobrirDocumentoFullEmpresa: descobrirDocumentoFullEmpresa,
    verificarSubscricao: verificarSubscricao,
    subscrever: subscrever,
    getEmailCliente:getEmailCliente,
    getNomeEmpresa,getNomeEmpresa
    
}
