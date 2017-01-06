(function () {
	angular
		.module('app')
		.factory('Api', ['$http', 'ConfigService', Api]);

	function Api ($http, ConfigService) {
		var api = {};
		api.get = function(url) {
			var request = $http.get(url);

			return request;
		};

		return api;
	}
}());