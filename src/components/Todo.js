import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({});

  const submitUpdate = value => {
    value.id = edit.id;
    console.log("value: "+JSON.stringify(value));
    console.log("edit id: "+edit.id);
    
    updateTodo(edit.id, value);
    setEdit({});

  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.taskName} 
      </div>
      <div className='icons'>
      {todo.taskDate} &nbsp;&nbsp;
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit(todo)}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;