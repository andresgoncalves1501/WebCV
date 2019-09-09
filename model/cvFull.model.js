function obterIdDocumentosFull(callback) {
    var operacaoFull = "";
    var resultados = [];

    var query = global.connect.con.query("SELECT documento.id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and desc_documento like '" + "%Full%" + "' and cliente.id_cliente = " + global.id, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("entraaaaaaa")
            if (rows.length == 0) {
                operacaoFull = "insert";
                console.log("uua - " + operacaoFull);
            }
            else {
                operacaoFull = "update";
                console.log("uu - " + operacaoFull);
            }
            console.log("Number of records inserted: " + rows.affectedRows);
            //callback(null, operacaoFull);
            resultados.push(operacaoFull);
        }
        else {
            console.log('Error while performing Query.', err);
        }
    });

    var query2 = global.connect.con.query("SELECT documento.desc_documento as desc_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and desc_documento like '" + "%Full%" + "' and cliente.id_cliente = " + global.id, function(err, rows, fields) {
        console.log(query2.sql);
        if (!err) {
            console.log("entraaaaaaa")
            resultados.push(rows);
        }
        else {
            console.log('Error while performing Query.', err);
        }
        callback(null, resultados)
    });
}

function saveDocumentFull(callback) {
    var dd = new Date();
    var ano = dd.getFullYear();
    var mes = dd.getMonth() + 1;
    var dia = dd.getDate();
    var hora = dd.getHours();
    //var hora = dd.getHours() + 1;
    var minutos = dd.getMinutes();
    var segundos = dd.getSeconds();

    var data = ano + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;

    console.log("Full " + dia);

    console.log("EU QUERO - " + global.operFull);


    // var query = global.connect.con.query("DELETE FROM documento where id_cliente = '" + global.id + "')", function(err, rows, fields) {
    //     console.log(query.sql);
    //     if (!err) {
    //         console.log("Number of records inserted: " + rows.affectedRows);
    //     }
    //     else {
    //         console.log('Error while performing Query.', err);
    //     }
    // });

    if (global.operFull == "insert") {
        var query = global.connect.con.query("INSERT INTO documento(desc_documento, id_cliente, data_insercao) VALUES ('" + "Full_cv_livre" + "', '" + global.id + "','" + data + "')", function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });
    }
    else if (global.operFull == "update") {
        var query2 = "UPDATE documento set data_insercao = '" + data + "', desc_documento = '" + "Full_cv_livre" + "' where id_cliente = " + global.id + " and desc_documento like '" + "%Full%" + "'";
        console.log("cuuuuuu FULL - " + query2)
        global.connect.con.query(query2, function(err, rows, fields) {
            console.log(query2.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });
    }





    // var query = global.connect.con.query("INSERT INTO documento(desc_documento, id_cliente, data_insercao) VALUES ('" + "Full_cv_livre" + "', '" + global.id + "','" + data + "')", function(err, rows, fields) {
    //     console.log(query.sql);
    //     if (!err) {
    //         console.log("Number of records inserted: " + rows.affectedRows);
    //     }
    //     else {
    //         console.log('Error while performing Query.', err);
    //     }
    // });

    var query3 = global.connect.con.query("SELECT id_documento from documento where data_insercao = (select max(data_insercao) from documento)", function(err, rows, fields) {
        console.log(query3.sql);
        if (!err) {
            console.log("deu - " + rows);
        }
        else {
            console.log("Error while performing Query.", err);
        }
        callback(null, rows);
    })
}

function saveFullCV(profissaoFull, cartaFull, academicaFull, profissionalFull, projetos_npro_realizadosFull, projetos_pro_realizadosFull, skillsFull, objetivosFull, informacaoFull, callback) {

    console.log("saveFullCV");

    var post = {
        profissaoFull: global.profissao,
        cartaFull: global.carta,
        academicaFull: academicaFull,
        profissionalFull: profissionalFull,
        projetos_npro_realizadosFull: projetos_npro_realizadosFull,
        projetos_pro_realizadosFull: projetos_pro_realizadosFull,
        skillsFull: skillsFull,
        objetivosFull: objetivosFull,
        informacaoFull: informacaoFull
    }

    console.log("O post do short_CV é " + post.profissaoFull);
    console.log("O post do short_CV é " + post.cartaFull);
    console.log("O post do short_CV é " + post.informacaoFull);
    //console.log("Post cv model - " + global.idFull);

    //  var query2 = global.connect.con.query("DELETE FROM linha where id_linha = (SELECT * FROM cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and id_cliente = '" + global.id + "')", function(err, rows, fields) {
    //     console.log(query2.sql);
    //     if (!err) {
    //         console.log("Number of records inserted: " + rows.affectedRows);
    //     }
    //     else {
    //         console.log('Error while performing Query.', err);
    //         console.log("Apagado");
    //     }
    //  });

    if (global.tipo_Full == "Full_cv_livre" || global.tipo_Full == undefined) {
        if (global.operFull == "insert") {
            console.log("linha Full - " + global.operFull)
            for (var x in post) {
                console.log("for - " + post[x])
                console.log("for - " + x)
                var query = global.connect.con.query("INSERT INTO linha(desc_linha, valor_linha, id_documento) VALUES ('" + x + "', '" + post[x] + "','" + global.idDoc + "')", function(err, rows, fields) {
                    console.log(query.sql);
                    if (!err) {
                        console.log("Number of records inserted: " + rows.affectedRows);
                    }
                    else {
                        console.log('Error while performing Query.', err);
                    }
                });
            }
        }
        else if (global.operFull == "update") {
            console.log("linha Full - " + global.operFull)

            for (var x in post) {
                console.log("for - " + post[x])
                console.log("for - " + x)
                var query2 = global.connect.con.query("UPDATE linha set valor_linha = '" + post[x] + "' where desc_linha = '" + x + "' and id_documento = " + global.idDoc + "", function(err, rows, fields) {
                    console.log(query2.sql);
                    if (!err) {
                        console.log("Number of records inserted: " + rows.affectedRows);
                    }
                    else {
                        console.log('Error while performing Query.', err);
                    }
                });
            }
        }

        callback(null, global.operFull);
    }
    else if (global.tipo_Full == "Full_cv_personalizado") {

        //apaga o resgito existente
        var query3 = "DELETE FROM coluna where id_linha in (select id_linha from linha where id_documento = " + global.idDoc + ")";
        console.log(" FULL - " + query3)
        global.connect.con.query(query3, function(err, rows, fields) {
            console.log(query3.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        var query4 = "DELETE FROM linha where id_documento = " + global.idDoc + "";
        console.log("FULL - " + query4)
        global.connect.con.query(query4, function(err, rows, fields) {
            console.log(query4.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        //criar um novo registo através do insert
        for (var x in post) {
            console.log("for - " + post[x])
            console.log("for - " + x)
            var query5 = global.connect.con.query("INSERT INTO linha(desc_linha, valor_linha, id_documento) VALUES ('" + x + "', '" + post[x] + "','" + global.idDoc + "')", function(err, rows, fields) {
                console.log(query5.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        callback(null, global.operFull);
    }
    



    // var query2 = global.connect.con.query("SELECT max(data_insercao) as data_recente from documento", function(err, rows, fields){
    //     console.log(query2.sql);
    //     if(!err)
    //     {
    //         console.log("deu - " + rows);
    //     }
    //     else
    //     {
    //         console.log("Error while performing Query.", err);
    //     }
    //     //callback(null, rows);
    // })
}
function getEmailEmpresas(callback) {
    global.connect.con.query("SELECT empresa.email from cliente, documento, documento_empresa, empresa where cliente.id_cliente = documento.id_cliente and documento.id_documento = documento_empresa.id_documento and documento_empresa.id_empresa = empresa.id_empresa and cliente.id_cliente = " +  global.id + "", function(err, rows, fields) {
        var haver = "";
        var array = [];
        
        if (rows.length == 0) {
            haver = "nao"
        }
        else {
            haver = "sim"
        }
        
        array.push(haver);
        array.push(rows);
        callback(null, array);
    })
}

//exportar as funções
module.exports = {
    saveDocumentFull: saveDocumentFull,
    saveFullCV: saveFullCV,
    obterIdDocumentosFull: obterIdDocumentosFull,
    getEmailEmpresas: getEmailEmpresas
}
