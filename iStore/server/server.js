var express = require('express');
var app = express();
var bodyParser =  require('body-parser');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin',req.headers.origin);
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
});

var server = app.listen('1111', function() {
	console.log('Server is listening on port ' + server.address().port);
});