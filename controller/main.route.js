//rota inicial
global.app.get('/', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('./views/main.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);
});

//rota inicial
global.app.get('/mainEmpresa', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('./views/mainEmpresa.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);
});

//rota inicial
global.app.get('/mainIndividuo', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('./views/mainIndividuo.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);
});


global.app.post('/sendEmail', function(req, res) {
    console.log("email");
    var transporter = global.nodemailer.createTransport(global.smtpTransport({
        service: 'gmail',
        auth: {
            user: 'luisviolas888@gmail.com',
            pass: "bcnsvddlwtdktqhm"
        }
    }));
    transporter.verify(function(error, success) {
        if (error) { console.log(error); }
        else { console.log('Server is ready to take our messages'); }
    })
    var mailOptions = {
        from: req.body.email,
        to: "luisviolas888@gmail.com",
        subject: req.body.assunto,
        html: req.body.texto
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) { console.log(error); }
        else {
            console.log('Email sent: ' + info.response);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });

});