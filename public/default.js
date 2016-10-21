const todos = angular.module('todos', []);

//HTTP factory:
todos.factory('todosData', ['$http', function ($http) {
  return {
    retrieveTodos,
    createTodo,
    toggleCompleted
  }

  function retrieveTodos($http) {
    return $http.get('/todos');
  }

  function createTodo($http, newTodo) {
    return $http.post('/todos', {task: newTodo, complete: false} )
      .then(res => res.data)
  }

  function toggleCompleted($http, todo) {
    return $http.put('/todos/' + todo._id, todo).then( (res => res.data) )
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
    todosData.toggleCompleted($http, todo).then( updated => {
      vm.todos.forEach( (todo, key) => {
        if(todo._id === updated._id) {
          vm.todos.splice(key, 1, updated);
        }
      })
    })
    vm.remaining = getRemaining(vm.todos);
  }
  vm.addTodo = () => {
    todosData.createTodo($http, vm.newTodo)
      .then( (newTodo) => {
          vm.todos.push(newTodo);
          vm.remaining = getRemaining(vm.todos);
          document.getElementById('newTodo').value = '';
        }
      )
  }

  function getRemaining(todos) {
    return todos.filter(todo => !todo.complete).length;
  }

}]);
