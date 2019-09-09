function saveDocumentFullPers(callback) {
    var dd = new Date();
    var ano = dd.getFullYear();
    var mes = dd.getMonth() + 1;
    var dia = dd.getDate();
    var hora = dd.getHours();
    var minutos = dd.getMinutes();
    var segundos = dd.getSeconds();

    var data = ano + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;

    console.log("Full " + dia);

    console.log("Update ou insert - " + global.operFull);

    if (global.operFull == "insert") {

        var query = global.connect.con.query("INSERT INTO documento(desc_documento, id_cliente, data_insercao) VALUES ('" + "Full_cv_personalizado" + "', '" + global.id + "','" + data + "')", function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });
    }
    else if (global.operFull) {
        var query2 = "UPDATE documento set data_insercao = '" + data + "', desc_documento = '" + "Full_cv_personalizado" + "' where id_cliente = '" + global.id + "' and desc_documento like '" + "%Full%" + "'";
        console.log("cuuuuuu FULL PERS - " + query2)
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

function saveLinhaCVPers(callback) {
    var dd = new Date();
    var ano = dd.getFullYear();
    var mes = dd.getMonth() + 1;
    var dia = dd.getDate();
    var hora = dd.getHours();
    var minutos = dd.getMinutes();
    var segundos = dd.getSeconds();

    var data = ano + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;

    console.log("saveFullCV");

    var cabecalho = ["profissaoFullPers", "carta", "academica", "profissional", "projetos nao profissionais", "projetos profissionais", "skills", "objetivos", "informacao"];


    // var post = {
    //     profissaoFullPers : profissaoFullPers,
    //     cartaFullPers: cartaFullPers
    // }


    // console.log("O post do short_CV é " + post.profissaoFullPers);
    // console.log("O post do short_CV é " + post.cartaFullPers);

    if (global.tipo_Full == "Full_cv_personalizado" || global.tipo_Full == undefined) {
        if (global.operFull == "insert") {
            for (var i = 0; i < cabecalho.length; i++) {
                var query = global.connect.con.query("INSERT INTO linha(desc_linha, id_documento, data_insercao) VALUES ('" + cabecalho[i] + "', '" + global.idDoc + "', '" + data + "')", function(err, rows, fields) {
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
            for (var i = 0; i < cabecalho.length; i++) {
                var query2 = global.connect.con.query("UPDATE linha set data_insercao = '" + data + "' where id_documento = '" + global.idDoc + "' and desc_linha = '" + cabecalho[i] + "'", function(err, rows, fields) {
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
    else if (global.tipo_Full == "Full_cv_livre") {
        var query3 = "DELETE FROM linha where id_documento = " + global.idDoc + "";
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

        for (var i = 0; i < cabecalho.length; i++) {
            var query4 = global.connect.con.query("INSERT INTO linha(desc_linha, id_documento, data_insercao) VALUES ('" + cabecalho[i] + "', '" + global.idDoc + "', '" + data + "')", function(err, rows, fields) {
                console.log(query4.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        global.operFull = "insert";
    }


    var query5 = global.connect.con.query("SELECT id_linha from linha where data_insercao = (select max(data_insercao) from linha)", function(err, rows, fields) {
        console.log(query5.sql);
        if (!err) {
            console.log("deu - " + rows);
        }
        else {
            console.log("Error while performing Query.", err);
            console.log(rows);
        }
        callback(null, rows);
    })

    // for (var i = 0; i < ) {
    //     console.log("for - " + post[x])
    //     console.log("for - " + x)
    //     var query = global.connect.con.query("INSERT INTO linha(desc_linha, valor_linha, id_documento) VALUES ('" + x + "', '" + post[x] + "','" + global.idDoc + "')", function(err, rows, fields) {
    //         console.log(query.sql);
    //         if (!err) {
    //             console.log("Number of records inserted: " + rows.affectedRows);
    //         }
    //         else {
    //             console.log('Error while performing Query.', err);
    //         }
    //     });
    // }

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

function saveFullCVPers(profissaoFullPers, cartaFullPers, arrayTabelaAcademica, mais_info_academica, arrayTabelaProfissional, mais_info_profissional, arrayTabelaPNP, arrayTabelaPP, capacidadesPers, objetivosPers, informacao_adicionalPers, callback) {
    console.log("model do sóooo - " + mais_info_academica);

    var arrayAcademica = ["instituicao", "curso", "anoInicio", "anoFim", "nota", "instituicao2", "curso2", "anoInicio2", "anoFim2", "nota2", "instituicao3", "curso3", "anoInicio3", "anoFim3", "nota3"];
    var arrayProfissional = ["empresa", "anoInicio", "anoFim", "profissao", "empresa2", "anoInicio2", "anoFim2", "profissao2", "empresa3", "anoInicio3", "anoFim3", "profissao3"];
    var arrayProjeto = ["nome", "tema", "anoInicio", "anoFim", "url", "nome2", "tema2", "anoInicio2", "anoFim2", "url2", "nome3", "tema3", "anoInicio3", "anoFim3", "url3"];

    //for (var i = 0; i < arrayTabelaAcademica.length; i++) {
    //console.log("model do array - " + arrayTabelaAcademica[i]);
    //}

    console.log("o inteiro - " + parseInt(global.idLinha));

    var idLinhaProfissao = parseInt(global.idLinha) - 8;
    var idLinhaCarta = parseInt(global.idLinha) - 7;
    var idLinhaAcademica = parseInt(global.idLinha) - 6;
    var idLinhaProfissional = parseInt(global.idLinha) - 5;
    var idLinhaPNP = parseInt(global.idLinha) - 4;
    var idLinhaPP = parseInt(global.idLinha) - 3;
    var idLinhaSkills = parseInt(global.idLinha) - 2;
    var idLinhaObjetivos = parseInt(global.idLinha) - 1;

    if (global.operFull == "insert") {
        var query = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + "profissaoFullPers" + "', '" + global.profissao + "', '" + idLinhaProfissao + "')", function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });


        var query2 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + "carta" + "', '" + global.carta + "', '" + idLinhaCarta + "')", function(err, rows, fields) {
            console.log(query2.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        for (var i = 0; i < arrayTabelaAcademica.length; i++) {
            var query3 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + arrayAcademica[i] + "', '" + arrayTabelaAcademica[i] + "', '" + idLinhaAcademica + "')", function(err, rows, fields) {
                console.log(query3.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        var query4 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + "mais_info_academica" + "', '" + mais_info_academica + "', '" + idLinhaAcademica + "')", function(err, rows, fields) {
            console.log(query4.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        for (var j = 0; j < arrayTabelaProfissional.length; j++) {
            var query5 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + arrayProfissional[j] + "', '" + arrayTabelaProfissional[j] + "', '" + idLinhaProfissional + "')", function(err, rows, fields) {
                console.log(query5.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        var query6 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + "mais_info_profissional" + "', '" + mais_info_profissional + "', '" + idLinhaProfissional + "')", function(err, rows, fields) {
            console.log(query6.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        for (var k = 0; k < arrayTabelaPNP.length; k++) {

            var query7 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + arrayProjeto[k] + "', '" + arrayTabelaPNP[k] + "', '" + idLinhaPNP + "')", function(err, rows, fields) {
                console.log(query7.sql);
                console.log("pleaasee - " + arrayProjeto[k])
                console.log("pleaasee - " + arrayTabelaPNP[k])
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        for (var l = 0; l < arrayTabelaPP.length; l++) {
            var query8 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + arrayProjeto[l] + "', '" + arrayTabelaPP[l] + "', '" + idLinhaPP + "')", function(err, rows, fields) {
                console.log(query8.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        var query9 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + "skills" + "', '" + capacidadesPers + "', '" + idLinhaSkills + "')", function(err, rows, fields) {
            console.log(query9.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        var query10 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + "objetivos" + "', '" + objetivosPers + "', '" + idLinhaObjetivos + "')", function(err, rows, fields) {
            console.log(query10.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        var query11 = global.connect.con.query("INSERT INTO coluna(desc_coluna, valor_coluna, id_linha) VALUES ('" + "informacao_adicional" + "', '" + informacao_adicionalPers + "', '" + global.idLinha + "')", function(err, rows, fields) {
            console.log(query11.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });
    }
    else if (global.operFull == "update") {
        var query12 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + global.profissao + "' where id_linha = '" + idLinhaProfissao + "' and desc_coluna = '" + "profissaoFullPers" + "'", function(err, rows, fields) {
            console.log(query12.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });


        var query13 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + global.carta + "' where id_linha = '" + idLinhaCarta + "' and desc_coluna = '" + "carta" + "'", function(err, rows, fields) {
            console.log(query13.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        for (var m = 0; m < arrayTabelaAcademica.length; m++) {
            var query14 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + arrayTabelaAcademica[m] + "' where desc_coluna = '" + arrayAcademica[m] + "' and id_linha = '" + idLinhaAcademica + "'", function(err, rows, fields) {
                console.log(query14.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        var query15 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + mais_info_academica + "' where id_linha = '" + idLinhaAcademica + "' and desc_coluna = '" + "mais_info_academica" + "'", function(err, rows, fields) {
            console.log(query15.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        for (var n = 0; n < arrayTabelaProfissional.length; n++) {
            var query16 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + arrayTabelaProfissional[n] + "' where id_linha = '" + idLinhaProfissional + "' and desc_coluna = '" + arrayProfissional[n] + "'", function(err, rows, fields) {
                console.log(query16.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        var query17 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + mais_info_profissional + "' where id_linha = '" + idLinhaProfissional + "' and desc_coluna = '" + "mais_info_profissional" + "'", function(err, rows, fields) {
            console.log(query17.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        for (var p = 0; p < arrayTabelaPNP.length; p++) {

            var query18 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + arrayTabelaPNP[p] + "' where id_linha = '" + idLinhaPNP + "' and desc_coluna = '" + arrayProjeto[p] + "'", function(err, rows, fields) {
                console.log(query18.sql);
                console.log("pleaasee - " + arrayProjeto[i])
                console.log("pleaasee - " + arrayTabelaPNP[i])
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        for (var q = 0; q < arrayTabelaPP.length; q++) {
            var query19 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + arrayTabelaPP[q] + "' where id_linha = '" + idLinhaPP + "' and desc_coluna = '" + arrayProjeto[q] + "'", function(err, rows, fields) {
                console.log(query19.sql);
                if (!err) {
                    console.log("Number of records inserted: " + rows.affectedRows);
                }
                else {
                    console.log('Error while performing Query.', err);
                }
            });
        }

        var query20 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + capacidadesPers + "' where id_linha = '" + idLinhaSkills + "' and desc_coluna = '" + "skills" + "'", function(err, rows, fields) {
            console.log(query20.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        var query21 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + objetivosPers + "' where id_linha = '" + idLinhaObjetivos + "' and desc_coluna = '" + "objetivos" + "'", function(err, rows, fields) {
            console.log(query21.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });

        var query22 = global.connect.con.query("UPDATE coluna set valor_coluna = '" + informacao_adicionalPers + "' where id_linha = '" + global.idLinha + "' and desc_coluna = '" + "informacao_adicional" + "'", function(err, rows, fields) {
            console.log(query22.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        });
    }


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
    saveDocumentFullPers: saveDocumentFullPers,
    saveLinhaCVPers: saveLinhaCVPers,
    saveFullCVPers: saveFullCVPers,
    getEmailEmpresas: getEmailEmpresas
}
