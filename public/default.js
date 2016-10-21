const todos = angular.module('todos', []);

//HTTP factory:
todos.factory('todosData', ['$http', function ($http) {
  return {
    retrieveTodos,
    createTodo
  }

  function retrieveTodos($http) {
    return $http.get('/todos');
  }

  function createTodo($http, newTodo) {
    return $http.post('/todos', {task: newTodo, complete: false} );
  }

}])

//Greet Controller:
todos.controller('Greet', function() {
  this.message = "Hello";
})

//HomeController:
todos.controller('HomeController', ['$http', 'todosData', function ($http, todosData) {
  var vm = this;
  todosData.retrieveTodos($http).then( res => {
    vm.todos = res.data;
    vm.remaining = getRemaining(vm.todos);
  });
  vm.toggleComplete = todo => {
    todo.complete = !todo.complete;
    vm.remaining = getRemaining(vm.todos);
  }
  vm.addTodo = () => {
    todosData.createTodo($http, vm.newTodo)
      .then( () => {
          todosData.retrieveTodos($http).then( res => {
            vm.todos = res.data;
            vm.remaining = getRemaining(vm.todos);
            document.getElementById('newTodo').value = '';
          })
      });
  }

  function getRemaining(todos) {
    return todos.filter(todo => !todo.complete).length;
  }

}]);
