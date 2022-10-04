import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.taskName : '');
  const [inputDate, setInputDate] = useState(props.edit ? props.edit.taskDate : '');

  const inputRef = useRef(null);
  const inputDateRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    //inputDateRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleDateChange = e => {
    setInputDate(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      taskName: input,
      taskDate: inputDate
    });
    setInput('');
    setInputDate('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <textarea
            placeholder='Add Task'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-textarea edit'
          />
          <input
            type="date"
            value={inputDate}
            onChange={handleDateChange}
            name='date'
            ref={inputDateRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <textarea 
            placeholder='Add Task'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-textarea'
            ref={inputRef}
          />
          <input
            type="date"
            value={inputDate}
            onChange={handleDateChange}
            name='date'
            ref={inputDateRef}
            className='todo-input'
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add Task
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;