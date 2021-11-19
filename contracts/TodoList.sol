// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

contract TodoList {
  uint256 public taskCount = 0;

  struct Task {
    uint256 id;
    string content;
    bool completed;
  }

  mapping(uint256 => Task) public tasks;

  constructor() {
    createTask('Check out dappuniversity.com');
  }

  function getTask(uint256 _id)
    public
    view
    returns (
      uint256 id,
      string memory content,
      bool completed
    )
  {
    Task memory task = tasks[_id];
    return (task.id, task.content, task.completed);
  }

  function createTask(string memory _content) public {
    taskCount++;
    tasks[taskCount] = Task(taskCount, _content, false);
  }
}
