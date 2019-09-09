function save(account, email, password, name, bday, address, observations) {
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON
    var post = {
        account: account,
        email: email,
        password: password,
        name: name,
        bday: bday,
        address: address,
        observations: observations
    };
    console.log("O post é " + post.email)

    if (post.account == "individual") {
        var query = global.connect.con.query("INSERT INTO cliente (email, password, nome_cliente, data_nascimento, morada, observacoes) VALUES ('" + post.email + "', '" + post.password + "', '" + post.name + "', '" + post.bday + "', '" + post.address + "', '" + post.observations + "')", function(err, rows, fields) {
            console.log("inseriu cliente " + query.sql);
            if (!err) {
                console.log("Number of records inserted: " + rows.affectedRows);
            }
            else {
                console.log('Error while performing Query.', err);
            }
        })
    }
    else
    {
        var query = global.connect.con.query("INSERT INTO empresa (email, password, nome_empresa, data_nascimento, morada, observacoes) VALUES ('" + post.email + "', '" + post.password + "', '" + post.name + "', '" + post.bday + "', '" + post.address + "', '" + post.observations + "')", function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            console.log('Error while performing Query.', err);
        }
    })
    }


};

function verificarMail(account, email, callback) {
    
    var existir = "";

    var post = {
        account: account,
        email: email
    };

    console.log("melhorar " + post.account);

    console.log("dar " + post.email);

    var sql = "";

    if (post.account == "individual") {
        sql = 'SELECT email from cliente where email = "' + post.email + '"';
    }
    else {
        sql = 'SELECT email from empresa where email = "' + post.email + '"';
    }

    //var sql = 'SELECT * from cliente, documento, documento_empresa, empresa where cliente.id_cliente = documento.id_cliente and documento.id_documento = documento_empresa.id_documento and documento_empresa.id_empresa = empresa.id_empresa and empresa.email = "' + post.email + '" or cliente.email = "' + post.email + '"';
    
    console.log(sql)
    global.connect.con.query(sql, function(err, rows, fields) {
        if (!err) {
            console.log("rows - " + rows.length)
            if (rows.length == 0) {
                existir = "nao";
                console.log("mode - nao existe");
            }
            else {
                existir = "sim";
                console.log("mode - existe")
            }

        }
        else {
            console.log('Error while performing Query.', err);
        }
        callback(null, existir);
    });

}

//exportar as funções
module.exports = {
    save: save,
    verificarMail: verificarMail
}
