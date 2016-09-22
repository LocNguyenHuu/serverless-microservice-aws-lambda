var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("./src")).listen(8888, function(){
    console.log('Server running on 8888...');
});
