function procurarTemplate(callback) {
    var query = "SELECT id_documento, n_template from documento, cliente where cliente.id_cliente = documento.id_cliente and n_template != '" + null + "' and documento.id_cliente = " + global.id + " and documento.desc_documento like '" + '%Full%' + "'";
    console.log(" TEMPLATE - " + query)
    console.log(query.sql);
    global.connect.con.query(query, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            var haver = "";
            var array = [];

            console.log("Number of records inserted: " + rows.affectedRows);
            if (rows.length == 0) {
                haver = "nao";
            }
            else {
                haver = "sim";
            }
            array.push(haver);
            array.push(rows);
            callback(null, array);
        }
        else {
            console.log('Error while performing Query.', err);
        }
    });
}

function guardarTemplate(template, callback) {
    var query2 = "UPDATE documento set n_template = '" + template + "' where id_documento = " + global.idDoc + "";
    console.log(" TEMPLATE - " + query2)
    global.connect.con.query(query2, function(err, rows, fields) {
        console.log(query2.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            console.log('Error while performing Query.', err);
        }
    });

    callback(null, "done");
}

//exportar as funções
module.exports = {
    guardarTemplate: guardarTemplate,
    procurarTemplate: procurarTemplate
}
