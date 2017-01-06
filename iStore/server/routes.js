exports.routes = function routes(app) {
	var products =  require('./components/products.js');

	//GET all method
	app.get('/products', products.getAllProducts);

	//GET by ID method
	app.get('/products/:id', products.getProductById);

	//add new item in basket method
	app.post('/products', products.addNewProduct);

	//method for deleting products
	app.delete('/products/:id', products.deleteProduct); 
};