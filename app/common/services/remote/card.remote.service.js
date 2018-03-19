'use strict';
angular.module('myApp.cardRemoteService', [])
    .factory('cardRemoteService', ['$in', function($in) {
        return {
            fetchCards: function(){
                return $in.remote.API.call('GET', "/assets/json/cards.json");
            }
        };

    }]);