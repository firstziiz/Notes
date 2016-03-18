var app = angular.module('smy', ['ngSanitize', 'firebase']);

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false, // if false -> allow plain old HTML ;)
  smartLists: true,
  smartypants: false,
  highlight: function(code, lang) {
    // in case, there is code without language specified
    if (lang) {
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
});

app.controller('summaryController', ['$scope', '$http', '$firebaseArray', function($scope, $http, $firebaseArray) {
  var smyRef = new Firebase("https://ch-notes.firebaseio.com/summary");
  var query = smyRef.orderByChild("timestamp");
  var summaries = $firebaseArray(query);
  $scope.summaries = summaries;
  // console.log(summaries);

  $scope.addSummary = function() {
    console.log('add complete.')
    var timestamp = new Date().valueOf();
    $scope.summaries.$add({
      smyName: 'Emtry',
      smyText: '...',
    });
  };
}]);

app.controller('smyController', ['$scope', function($scope) {

  $scope.$watch('smy.smyText', function(current, original) {
    $scope.outputText = marked(current);
  });

}]);

app.directive("autoGrow", function() {
  return function(scope, element, attr) {
    var update = function() {
      element.css("height", "auto");
      element.css("height", element[0].scrollHeight + "px");
    };
    scope.$watch(attr.ngModel, function() {
      update();
    });
    attr.$set("ngTrim", "false");
  };
});
