const app = angular.module('greet', []);

app.controller('Greet', Greet);

function Greet() {
  const vm = this; //this is bound to the scope of that controller
  vm.greeting = 'Hello'
}
