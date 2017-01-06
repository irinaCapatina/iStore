(function () {
	angular
		.module('app')
		.factory('ConfigService', [ConfigService]);

	function ConfigService () {
		var Config = {};

		Config.apiUrl = 'components/main/controller/products.json';

		return Config;
	}
}());