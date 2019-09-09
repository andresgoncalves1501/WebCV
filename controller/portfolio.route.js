global.app.get('/portfolio', function(req, res) {
    console.log("aves")
    //leitura do ficheiro registo.html
    var html = global.fs.readFileSync('./views/portfolio.html');

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html)
});