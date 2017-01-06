var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var fs =  require('fs'); //file system


// GET method
exports.getAllProducts = function  getAllProducts(req, res) {
	var  productList = []; //array that will contain products after reading

	fs.readdir('./components/data/', function(err, files) {
		if(err) {
			return res.status(401).send('Error reading products directory');
		}

		//creating a loop over files and getting products
		files.forEach(function(item) {
			var obj = fs.readFileSync('.components/data/' + item, {
				encoding: 'UTF-8'
			});
			//decoding files/read content/parsing to JSON and pushing to result
			productList.push(JSON.parse(obj.toString()));
		});

		//product list control
		if(productList.length === 0) {
			return res.status(404).send('Sorry, there are no products in stock.');
		}
		res.send(productList); //sending results
	});
};

//GET By ID method
exports.getProductById = function getProductById(req, res) {
	//if we didn't receive id, send error
	if(!req.params.id) {
		return res.status(409).send('ID is mandatory');
	}

	var results = {}; 
	var productIdExists;

	//read all files from data directory
	fs.readdir('./components/data/', function(error, files) {
		if(error) {
			return res.status(401).send('Filed reading directory with products');
		}

		//making a loop over filer and getting products
		files.forEach(function(item) {
			//decoding files/reading content/parsing to JSON and pushing to result
			var obj = fs.readFileSync('./components/data/' + item, {
				encoding: 'UTF-8'
			});

			obj = JSON.parse(obj);
			if(obj.id === req.params.id) { 
				results = obj;
				productIdExists = true;
				return res.status(200).send(results);
				console.log(productIdExists);
			}
		});

		if(!productIdExists) {
			res.status(404).send('Not found such ID');
		}
	});
};

// POST method
exports.addNewProduct = function addNewProduct(req, res) {
	
	if(!req.body.name) {
		return res.status(409).send('Name of product is mandatory');
	}
	if(!req.body.price) {
		return  res.status(409).send('Price is mandatory');
	}

	//generate ID for each product
	var productId = 'ID_' + uuid.v4();

	//obj that will be pushed in data
	var entryData = req.body;

	entryData.id = productId;
	//method that converts a JJS value to a JSON string
	entryData = JSON.stringify(entryData);

	//write a JSON file with entry data info

	fs.writeFile('.components/data/' + productId + '.json', entryData, function(error) {
		if(error) {
			return res.status(401).send('Error in creating file');
		}
	});

	//response from server
	res.send('Product with id ' + productId + ' was successfully added ');
};

exports.deleteProduct = function deleteProduct(req, res) {
	//ctrl of blank property
	if(!req.params.id) {
		return res.status(409).send('ID is mandatory');
	}

	fs.unlink('.components/data/' + req.params.id + 'json', function(error) {
		if(error) {
			return res.status(401).send('Error in deltin product');
		}

		return res.send('Products was successfully deleted');
	});
};