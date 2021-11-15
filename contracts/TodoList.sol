// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;
    
    constructor() public {
        createTask('Check out dappuniversity.com');
    }
    
    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }
}
