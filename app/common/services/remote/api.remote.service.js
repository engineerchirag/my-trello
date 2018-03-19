'use strict';
angular.module('myApp.api', [])
    .factory('apiRemoteService',['$in', '$http', '$q', function($in, $http, $q) {
        return{
            call: function (method, url, data, headers, ignoreLoading) {

                if(!headers || Object.prototype.toString.call(headers) !== '[object Object]'){
                    headers = {
                        'Content-Type': 'application/json'
                    }
                }
                var deferred = $q.defer();
                var req = {
                    method: method,
                    url: url,
                    headers: headers,
                    data:data,
                    ignoreLoadingBar: ignoreLoading
                };

                $http(req).
                success(function(data, status, headers, config) {
                    data['http_status'] = status;
                    deferred.resolve(data);
                });

                return deferred.promise;
            },
            emptyPromise: function () {
                var defer = $q.defer();
                defer.resolve();
                return defer.promise;
            }
        }

    }]);