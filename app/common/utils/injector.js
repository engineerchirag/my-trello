'use strict';
angular.module('myApp.injector', [])
    .factory('$in', ['$injector', function ($injector) {
        var service = {
            activate: function () {
                service.remote = {
                    API: $injector.get('apiRemoteService'),
                    Card: $injector.get('cardRemoteService')

                };
                service.local = {
                    Card: $injector.get('cardLocalService')
                };
                service.model = {
                };
                service.storage = {
                };
                service.utils = {
                };
                service.const = {
                };
            }
        };
        return service;
    }]);
