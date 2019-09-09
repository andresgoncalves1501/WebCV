global.express = require('express');
var port = process.env.PORT;

//carregar bibliotecas globais
global.fs = require('fs');
global.mysql = require('mysql');
global.bodyParser = require('body-parser');

var session= require('express-session');
var cookieParser = require('cookie-parser');
global.request = require("request")
global.pdf = require('html-pdf');

global.path =require('path');
global.util = require('util');
global.fileUpload =require('express-fileupload')

global.nodemailer = require('nodemailer');
global.smtp = require('smtp')
global.smtpTransport = require('nodemailer-smtp-transport')
var router = global.express.Router();

//global.app.get('/upload', global.common.imageForm);
//global.app.post('/upload', global.common.uploadImage);

//VIOLASSSSSSSSSSSS




//iniciar a aplicação
global.app = global.express();

global.app.listen(port);

global.app.use(cookieParser());

global.app.use(global.fileUpload());

//global.app.set('trust proxy', 1) //trust first proxy
global.app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}))
global.app.use(global.bodyParser.json(), global.bodyParser.urlencoded({extended: true}));


//ficheiros estáticos
global.app.use('/style', global.express.static(__dirname + '/views/css'));
global.app.use('/img', global.express.static(__dirname + '/views/images'));
global.app.use('/img2', global.express.static(__dirname + '/views/images/thumbs'));
global.app.use('/views', global.express.static(__dirname + '/views'));


//definir rotas estáticas para ficheiros
global.app.use('/controller', global.express.static('controller'));

//carregar ficheiros MVC
global.connect = require('./assets/connect');

global.upload = require('./assets/multer.config.js');

global.modelUser = require('./model/registo.model');
global.routesUser = require('./controller/registo.route.js');

global.modelHistorico = require('./model/historico.model');
global.routesHistorico = require('./controller/historico.route.js');

global.modelLogin = require('./model/login.model');
global.routesLogin = require('./controller/login.route.js');

global.modelCV = require('./model/cv.model');
global.routesCV = require('./controller/cv.route.js');

global.routesPortfolio = require("./controller/portfolio.route.js");

global.modelCVFull = require('./model/cvFull.model.js');
global.routesCVFull = require('./controller/cvFull.route.js');

global.modelCVFullPers = require('./model/cvFullPers.model');
global.routesCVFullPers = require('./controller/cvFullPers.route.js');

global.routesMain = require('./controller/main.route.js');

global.routesConsulta = require('./controller/consulta.route.js');
global.modelConsulta = require('./model/consulta.model');

global.routesSubscricoes = require('./controller/subscricoes.route.js');
global.modelSubscricoes = require('./model/subscricoes.model.js');

global.modelTemplate = require('./model/template.model');
global.routesTemplate = require('./controller/template.route.js');

global.routesCarregarTemplate = require('./controller/carregarTemplate.route.js');

global.modelCarregarTemplate = require('./model/carregarTemplateFull.model');
global.routes = require('./controller/carregarTemplateFull.route.js');

global.modelConsultaVerFull = require('./model/consultaVerFull.model');
global.routesConsultaVerFull = require('./controller/consultaVerFull.route.js');




  

  
  