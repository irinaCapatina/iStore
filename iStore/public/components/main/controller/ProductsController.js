(function () {
	angular
		.module('app')
		.controller('ProductsController', ['ConfigService', 'Api', '$stateParams', '$state', ProductsController]);

	function ProductsController (ConfigService, Api, $stateParams, $state){
		var self = this;
		self.dataB = [];

		self.getProduct = function getProduct(id) {
			$state.go('details',  {id:id});
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