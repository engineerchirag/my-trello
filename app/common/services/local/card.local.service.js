'use strict';
angular.module('myApp.cardLocalService', [])
    .factory('cardLocalService', ['$in', function($in) {
        return {
            getCards: function(){
                return $in.remote.Card.fetchCards();
            },
            getFilteredCards: function(type, cards) {
                return _.filter(cards, {'type': type});
            },
            getUpdatedCardsAfterRemove: function (cards, index){
                return cards.splice(index, 1);
            },
            getUpdatedCardsAfterAdd: function (cards, newCard){
                return cards.unshift(newCard);
            },
            getBoardIndex: function (boards, type){
                return  _.findIndex(boards, {"type": type});
            }
        };
    }]);