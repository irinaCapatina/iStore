(function () {
	angular
		.module('app')
		.config(routes);

	function routes($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: 'main',
				url: '/main',
				controller: 'ProductsController',
				controllerAs: 'products',
				templateUrl: 'components/main/template/main.template.html'
			});

		$urlRouterProvider.otherwise('main');
	}
}());