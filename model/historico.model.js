function saveCV(profissao, tipo_carta_conducao, carreira_academica, experiencia_profissional, projetos_realizados, skills, objetivos, informacao_adicional)
{

    //receber os dados do formulário que são enviados por post e guarda em objeto JSON
    var post = {
        profissao: profissao,
        tipo_carta_conducao: tipo_carta_conducao,
        carreira_academica: carreira_academica,
        experiencia_profissional: experiencia_profissional,
        projetos_realizados: projetos_realizados,
        skills: skills,
        objetivos: objetivos,
        informacao_adicional: informacao_adicional
    };
    
    //console.log("model console: " + post.email);
    
    
    var query = global.connect.con.query("INSERT INTO historico (id_cliente, nome_cliente, morada, data_nascimento, contacto, profissao, tipo_carta_conducao, id_tipo_historico) VALUES ('" + "22" + "', '" + post.name + "', '" + post.address + "', '" + post.bday + "', '" + post.email + "', '" + post.profissao + "', '" + post.tipo_carta_conducao + "', '" + "0" + "')", function (err, rows, fields)
    {
        console.log(query.sql);
        if(!err)
        {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
        {
            console.log('Error while performing Query.', err);
        }
    })
    
    //var id_do_historico = global.connect.con.query("SELECT id_historico from historico where nome_cliente = '" + name + "'");
    
    //console.log(id_do_historico)
    
    var queryEstrutura = global.connect.con.query("INSERT INTO estrutura_cv (carreira_academica, experiencia_profissional, projetos_realizados, skills, objetivos, informacao_adicional) VALUES ('" + post.carreira_academica + "', '" + post.experiencia_profissional + "', '" + post.projetos_realizados + "', '" + post.skills + "', '" + post.objetivos + "', '" + post.informacao_adicional + "')", function (err, rows, fields)
    {
        console.log(queryEstrutura.sql);
        if(!err)
        {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
        {
            console.log('Error while performing Query possa.', err);
        }
    })
    
    
};

//função de leitura que retorna o resultado no callback
function readUserInfo(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT name from contas_user where id_user = 22', function(err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

//exportar as funções
module.exports = {
    saveCV: saveCV,
    readUserInfo: readUserInfo
}