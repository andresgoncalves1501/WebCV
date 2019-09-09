function descobrirDocumentoShort(callback) {
    console.log("descobrirDocumentoShort MODEL");
    var query = global.connect.con.query("SELECT documento.id_documento, valor_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and documento.id_documento = (SELECT id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.id + " and desc_documento = '" + "Short_cv" + "')", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("deu - " + rows);
            var existeDocumentoShort = "";
            var arrayExisteDocumentoShort = [];

            if (rows.length == 0) {
                existeDocumentoShort = "nao";
                console.log("existeDocumentoShort MERDA - " + existeDocumentoShort);
            }
            else {
                existeDocumentoShort = "sim";
                console.log("existeDocumentoShort MERDA - " + existeDocumentoShort);
            }
            console.log("Number of records inserted: " + rows.affectedRows);
            arrayExisteDocumentoShort.push(existeDocumentoShort);
            arrayExisteDocumentoShort.push(rows);
            callback(null, arrayExisteDocumentoShort);
        }
        else {
            console.log("Error while performing Query.", err);
        }
    })
}


function obterIdDocumentos(callback) {
    var query = global.connect.con.query("SELECT documento.id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and desc_documento = '" + "Short_cv" + "' and cliente.id_cliente = " + global.id, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            var operacao = "";

            if (rows.length == 0) {
                operacao = "insert";
                //console.log("uua - " + operacao);
            }
            else {
                operacao = "update";
                //console.log("uu - " + operacao);
            }
            //console.log("Number of records inserted: " + rows.affectedRows);
            callback(null, operacao);
        }
        else {
            //console.log('Error while performing Query.', err);
        }
    });
}

function saveDocument(callback) {
    //console.log("porqueeeeeeeeeeeee")
    var dd = new Date();
    var ano = dd.getFullYear();
    var mes = dd.getMonth() + 1;
    var dia = dd.getDate();
    var hora = dd.getHours();
    //var hora = dd.getHours() + 1;
    var minutos = dd.getMinutes();
    var segundos = dd.getSeconds();

    var data = ano + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;

    console.log(dia);

    console.log("EU QUERO - " + global.oper);

    if (global.oper == "insert") {
        var query = global.connect.con.query("INSERT INTO documento(desc_documento, id_cliente, data_insercao) VALUES ('" + "Short_cv" + "', '" + global.id + "','" + data + "')", function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });
    }
    else if (global.oper == "update") {
        var query2 = "UPDATE documento set data_insercao = '" + data + "' where id_cliente = '" + global.id + "' and desc_documento = " + "'Short_cv'";
        console.log("cuuuuuu - " + query2)
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

function saveShortCV(profissao, carta, academica, profissional, projetos, skills, objetivos, informacao, callback) {
    var post = {
        profissao: profissao,
        carta: carta,
        academica: academica,
        profissional: profissional,
        projetos: projetos,
        skills: skills,
        objetivos: objetivos,
        informacao: informacao
    }

    console.log("O post do short_CV é " + post.profissao);
    console.log("O post do short_CV é " + post.carta);
    console.log("O post do short_CV é " + post.informacao);
    console.log("Post cv model - " + global.id);


    // var query2 = global.connect.con.query("DELETE FROM linha where id_linha = (SELECT * FROM cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and id_cliente = '" + global.id + "')", function(err, rows, fields) {
    //     console.log(query2.sql);
    //     if (!err) {
    //         console.log("Number of records inserted: " + rows.affectedRows);
    //     }
    //     else {
    //         console.log('Error while performing Query.', err);
    //         console.log("Apagado");
    //     }
    //  });

    if (global.oper == "insert") {
        console.log("linha - " + global.oper)
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
    else if (global.oper == "update") {
        console.log("linha - " + global.oper)

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
    callback(null, global.oper);



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

function descobrirDocumentoFull(callback) {
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

function preencherDocumentoFull(callback) {


    var info = {
        profissaoFull: global.profissao,
        cartaFull: global.carta
    }

    if (global.IDdocumento != undefined) {
        if (global.TIPOdocumento == "Full_cv_livre") {
            for (var x in info) {
                console.log("for - " + info[x])
                console.log("for - " + x)
                var query2 = global.connect.con.query("UPDATE linha set valor_linha = '" + info[x] + "' where desc_linha = '" + x + "' and id_documento = " + global.IDdocumento + "", function(err, rows, fields) {
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
    }

    var query = global.connect.con.query("SELECT valor_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and documento.id_documento = (SELECT id_documento from cliente, documento where cliente.id_cliente = documento.id_cliente and cliente.id_cliente = " + global.id + " and desc_documento = '" + "Full_cv_livre" + "')", function(err, rows, fields) {
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

function preencherDocumentoFullPers(callback) {

    console.log("essa tal de marilu 2");

    if (global.IDdocumento != undefined) {
        if (global.TIPOdocumento == "Full_cv_personalizado") {
            var query12 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + global.profissao + "' where desc_coluna = '" + "profissaoFullPers" + "' and id_linha = (SELECT id_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and desc_linha = '" + "profissaoFullPers" + "' and documento.id_documento = '" + global.IDdocumento + "')", function(err, rows, fields) {
                console.log(query12.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });


            var query13 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + global.carta + "' where desc_coluna = '" + "carta" + "' and id_linha = (SELECT id_linha from cliente, documento, linha where cliente.id_cliente = documento.id_cliente and documento.id_documento = linha.id_documento and desc_linha = '" + "carta" + "' and documento.id_documento = '" + global.IDdocumento + "')", function(err, rows, fields) {
                console.log(query13.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }
    }

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
function uploadForm(req, res)
{
	//console.log("entrou123");
	var applicationform = {
		file: req.file
	};
	//console.log(JSON.stringify(applicationform, null, 4));

	res.send('Uploaded Successfully!');

	//console.log(applicationform.file.path);

//	var texto = readTextFile(applicationform.file.path);
	//lerTxtFile(texto);
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
    descobrirDocumentoShort: descobrirDocumentoShort,
    preencherDocumentoFull: preencherDocumentoFull,
    preencherDocumentoFullPers: preencherDocumentoFullPers,
    saveDocument: saveDocument,
    saveShortCV: saveShortCV,
    obterIdDocumentos: obterIdDocumentos,
    descobrirDocumentoFull: descobrirDocumentoFull,
    uploadForm: uploadForm,
    getEmailEmpresas: getEmailEmpresas
}
