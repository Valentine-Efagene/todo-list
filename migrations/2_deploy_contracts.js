//var TodoList = artifacts.require('TodoList')
var Adoption = artifacts.require('Adoption')

module.exports = function (deployer) {
  //deployer.deploy(TodoList)
  deployer.deploy(Adoption)
}
