

function fazerLogin(account, email, password, callback) {
    
    var existir = "";
    
    var post = {
        account: account,
        email: email,
        password: password
    }

    console.log("model: " + post.account + " " + post.email + " " + post.password);
    
    var sql;
    
    if(post.account == "individual")
    {
        sql = 'SELECT email, password from cliente where email = "' + post.email + '" and password = "' + post.password + '"';    
    }
    else
    {
        sql = 'SELECT email, password from empresa where email = "' + post.email + '" and password = "' + post.password + '"';
    }

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

function obterId(account, email, callback)
{
    var post = {
        account: account,
        email: email
    }
    
    global.contaaa = post.account;
    
    console.log("model do login - " + post.email + " " + post.account);
    
    var sql;
    
    if(post.account == "individual")
    {
        sql = 'SELECT id_cliente as id, nome_cliente as nome from cliente where email = "' + post.email + '"';    
    }
    else
    {
        sql = 'SELECT id_empresa as id, nome_empresa as nome from empresa where email = "' + post.email + '"';
    }
    
    console.log(sql);
    
    global.connect.con.query(sql, function(err, rows, fields) {
        if (!err) {
            console.log(rows)
            callback(null, rows);
        }
        else {
            console.log('Error while performing Query.', err);
        }
    });
}

//exportar as funções
module.exports = {
    fazerLogin: fazerLogin,
    obterId: obterId
}