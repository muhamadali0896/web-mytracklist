import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {

  const hostname = 'Mytracklistapi-env.eba-zcyfamts.ap-south-1.elasticbeanstalk.com';
  
  const [todos, setTodos] = useState([]);

  const fetchTasksHandler = useCallback(async () => {
    try {
      const response = await fetch('http://'+hostname+'/tasks/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const key in data) {
        loadedTasks.push({
          id: data[key]['id'],
          taskDate: data[key]['taskDate'],
          taskName: data[key]['taskName'],
          isCompleted: data[key]['isCompleted']
        });
      }
      setTodos(loadedTasks);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addTodo = todo => {
    if (!todo.taskName || /^\s*$/.test(todo.taskName)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);

    const taskData = {
        taskDate: new Date(todo.taskDate),
          taskName: todo.taskName,
          isCompleted: false
    }

    fetch('http://'+hostname+'/tasks/add', {
      method: 'POST',
      body: JSON.stringify(taskData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  useEffect(() => {
    fetchTasksHandler();
  }, [fetchTasksHandler]);


  const updateTodo = (todoId, newValue) => {
    if (!newValue.taskName || /^\s*$/.test(newValue.taskName)) {
      return;
    }
    fetch('http://'+hostname+'/tasks/update', {
      method: 'PUT',
      body: JSON.stringify(newValue),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    fetch(`http://`+hostname+`/tasks/delete/${id}`,{
            method: 'DELETE'
          });
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;