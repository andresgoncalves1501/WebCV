global.app.get('/cvShort', function(req, res) {

    var html = './views/cvShort.html';

    res.send(html)
});

global.app.get('/cvFull', function(req, res) {
    
     var html = '../views/cvFull.html';
     
    res.send(html)
});
global.app.get('/download',function(req,res){
    res.send(global.nomeCliente)


})