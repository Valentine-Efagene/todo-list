var TodoList = artifacts.require('TodoList')
var MetaCoin = artifacts.require('MetaCoin')
const ConvertLib = artifacts.require('ConvertLib')
//var Adoption = artifacts.require('Adoption')

module.exports = function (deployer) {
  deployer.deploy(TodoList)
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(MetaCoin)
  //deployer.deploy(Adoption)
}
