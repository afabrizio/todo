const todos = angular.module('todos', []);

todos.controller('Greet', function() {
  this.message = "Hello";
})

todos.controller('HomeController', HomeController);
HomeController.$inject = ['$http'];

function HomeController($http) {
  var vm = this;

  $http.get('/todos')
    .then(successCallback, errorCallback)
    .catch(err => alert(err.message));

  vm.addTodo = () => {
    $http.post('/todos', {task: vm.newTodo, complete: false} )
      .then( () => {
        updateView();
      })
  }

  function successCallback(response) {
    vm.todos = response.data;
    vm.toggleComplete = todo => {
      todo.complete = !todo.complete;
      vm.remaining = getRemaining(vm.todos);
    }
    vm.remaining = getRemaining(vm.todos);

    function getRemaining(todos) {
      return todos.filter(todo => !todo.complete).length;
    }
  }

  function errorCallback(err) {
    console.error(err);
  }

  function updateView() {
    $http.get('/todos')
      .then(successCallback, errorCallback)
      .catch(err => alert(err.message));
    document.getElementById('newTodo').value = '';
  }
}
