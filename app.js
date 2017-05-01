(function() {
    'use strict';
    angular
        .module('myApp', []);
}());

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('treeController', TreeController)

    TreeController.$inject = ['$scope'];

    /** @ngInject */
    function TreeController($scope) {
        var vm = this;

        init();

        function init() {

            $scope.objectJSON = {
                "companyName": "Apttus",
                "details": {
                    "products": ["CPQ", "CLM", "X-Author"],
                    "noOfEmployess": "500+",
                    "branches": {
                        "India": ["Bangalore", "Ahmedabad"],
                        "US": "San Jose"
                    },
                    "technologies": ["Salesforce", "Microsoft"]
                }
            };

            $scope.objectJSONStr = JSON.stringify($scope.objectJSON);

            $scope.tree = [{ name: "Node", nodes: [] }];

            $scope.treeObject = [{ name: "Object", nodes: [] }];

            $scope.parseTreeObject = function() {
                $scope.treeObject = [{ name: "Object", nodes: [] }];
                if ($scope.objectJSONStr === "") {
                    $scope.objectJSONStr = JSON.stringify($scope.objectJSON);
                }
                var nodes = JSON.parse($scope.objectJSONStr);
                $scope.treeObject[0].nodes = getNodes(nodes);
            };

            function getNodes(nodes, isArrayType) {
                var arr = [];
                for (var key in nodes) {
                    if (typeof nodes[key] === "string") {
                        if (isArrayType !== undefined && isArrayType) {
                            arr.push({ name: nodes[key], nodes: [] });
                        } else {
                            arr.push({ name: key + ':' + nodes[key], nodes: [] });
                        }
                    } else if (Array.isArray(nodes[key])) {
                        arr.push({ name: key, nodes: getNodes(nodes[key], true) });
                    } else {
                        arr.push({ name: key, nodes: getNodes(nodes[key]) });
                    }
                }
                return arr;
            }

            $scope.parseTreeObject();
        }

    }

}());