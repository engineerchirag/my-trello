'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trello', {
    templateUrl: '/components/trello/trello.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$in', '$scope', function($in, $scope) {
    $in.local.Card.getCards().then(function(cards){
        $scope.boards = [{
            type: "TO_DO",
            name: "To Do",
            cards: $in.local.Card.getFilteredCards('TO_DO', cards)
        },
        {
            type: "IN_PROGRESS",
            name: "In-progress",
            cards: $in.local.Card.getFilteredCards('IN_PROGRESS', cards)
        },
        {
            type: "DONE",
            name: "Done",
            cards: $in.local.Card.getFilteredCards('DONE', cards)
        }];
    });


    function getBoardIndex (type){
        return $in.local.Card.getBoardIndex($scope.boards, type);
    }

    $scope.addCard = function(type, data){
        var newCard = {
                title: "Title 1",
                description: data,
                type: type
            };

        $in.local.Card.getUpdatedCardsAfterAdd($scope.boards[getBoardIndex (type)].cards, newCard);
    };

    $scope.onDragStart = function(data,evt, type, index){
        $in.local.Card.addDragEffect($scope.boards[getBoardIndex (type)].cards, index);
    };

    $scope.onDragComplete = function(data,evt, type, index){
        $in.local.Card.getUpdatedCardsAfterRemove($scope.boards[getBoardIndex (type)].cards, index);
    };

    $scope.onDropComplete = function(data,evt, type, index){
        $in.local.Card.getUpdatedCardsAfterAdd($scope.boards[getBoardIndex (type)].cards, data.card);
    };

}]);