const todos = angular.module('todos', []);

todos.controller('Greet', function() {
  this.message = "Hello";
})

todos.controller('HomeController', HomeController);
HomeController.$inject = ['$http'];

function HomeController($http) {
  const todos = [
    {description: 'Get groceries.', complete: false},
    {description: 'Do dishes.', complete: false},
    {description: 'Fold laundry', complete: false}
  ]
  this.todos = loadTodos();
  this.toggleComplete = todo => {
    todo.complete = !todo.complete;
    this.remaining = getRemaining(this.todos);
  }

  this.remaining = getRemaining(this.todos);

  function getRemaining(todos) {
    return todos.filter(todo => !todo.complete).length;
  }

  function loadTodos() {
    var loadedTodos = [];
    $http.get('/todos').then(successCallback, errorCallback);

    function successCallback(response) {
      loadedTodos = response.data;
    }
    function errorCallback(err) {
      console.error(err.data);
    }
    return loadedTodos;
  }
}
