var app = angular.module('notesApp', ['ngSanitize', 'firebase']);

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

app.controller('markedController', ['$scope', '$http','$firebaseObject',function($scope, $http, $firebaseObject) {
  var ref = new Firebase("https://ch-notes.firebaseio.com/");
  var markdown = this; // alias for 'this', so we can access it in $scope.$watch
  var mdtext = $firebaseObject(ref);

  mdtext.$bindTo($scope, "data");

  this.inputText = '';

  $scope.$watch('marked.inputText', function(current, original) {
    markdown.outputText = marked(current);
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
