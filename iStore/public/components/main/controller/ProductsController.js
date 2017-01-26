(function () {
	angular
		.module('app')
		.controller('ProductsController', ['ConfigService', 'Api', '$stateParams', '$state', ProductsController]);

	function ProductsController (ConfigService, Api, $stateParams, $state){
		var self = this;
		self.dataB = [];
		self.basket = [];
		self.total = 0;

		self.addToBasket = function addToBasket(product) {
			self.basket.push(product);
			self.total += parseFloat(product.price);
		};

		self.getProductsCount = function() {
			var ctrlLength = self.basket.length;
			if(ctrlLength === 0) {
				return 'Empty';
			} else if(ctrlLength > 1) {
				return ctrlLength + 'items';
			} else if(ctrlLength === 1) {
			return ctrlLength + 'item';
			}
		};

		self.deleteProduct =  function deleteProduct(product) {
			self.basket.splice(self.basket.indexOf(product), 1);
			if (self.total > 0) {
				self.total -= parseFloat(product.price);
			}
		};

		self.getAllProducts = function getAllProducts() {
			Api.get(ConfigService.apiUrl)
			.then(function success(response) {
				self.dataB = response.data;
			}, function error(error) {
				console.log('Here is an error');
			});
		};
		self.getAllProducts();
	}
}());
