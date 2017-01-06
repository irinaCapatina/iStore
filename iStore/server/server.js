var express = require('express');
var app = express();
var bodyParser =  require('body-parser');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

require('./routes.js').routes(app);

var server = app.listen('1111', function() {
	console.log('Server is listening on port ' + server.address().port);
});