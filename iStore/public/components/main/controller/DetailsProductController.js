(function () {
	angular
		.module('app')
		.controller('DetailsProductController', ['ConfigService', 'Api', '$stateParams', '$state', DetailsProductController]);

	function DetailsProductController (ConfigService, Api, $stateParams, $state){
		var self = this;
		self.dataB = [];
		self.basket = [];
		self.dataId = [];
		self.result = [];

		self.getProductById = function getProductById() {
			Api.get(ConfigService.apiUrl)
				.then(function success(response) {
					self.dataId = response.data;
					self.dataId.forEach(function(element) {
						if(element.id == $stateParams.id) {
							self.result.push(element);
						}
					});
					return self.result;
				}, function error(error) {
					console.log('Here is an error!');
				});
		};

		self.getProductById();

		self.addProductToBasket = function addProductToBasket() {
			Api.get(ConfigService.apiUrl)
				.then(function success(response) {
					self.dataId = response.data;
					self.dataId.forEach(function(element) {
						if(element.id == $stateParams.id) {
							self.basket.push(element);
						}
					});
					return self.result;

				}, function error(error) {
					console.log('Here is an error ');
				});
		};

		self.getAddedProducts = function() {
			return self.basket.length;
		};

		angular
			.module('app')
			.filter('PriceFilter', ['$sce', PriceFilter]);

			function PriceFilter($sce) {
				return function(value) {
					if(value <'600') {
						return $sce.trustAsHtml('<strong><i>' + value + '</strong></i>');
					} else {
						return $sce.trustAsHtml(value);
					}
				};
			}


	}
}());