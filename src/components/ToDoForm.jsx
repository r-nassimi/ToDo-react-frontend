import axios from 'axios';
import React, { useState } from 'react';
const URL = 'http://localhost:8000';

const TodoForm = ({ tasks, setTasks }) => {
  const [inputTask, setInputTask] = useState('');

  const taskPost = (e) => {
    e.preventDefault();
    axios.post(`${URL}/createTask`, {
      text: inputTask,
      isCheck: false
    }).then(res => {
      setInputTask('');
      setTasks([...tasks, res.data]);
    });
  };

  return (
    <form onSubmit={ taskPost } className='taskForm'>
      {
        <>
          <input
            placeholder='Введите значение'
            value={ inputTask }
            onChange={(e) => setInputTask(e.target.value)}
            name='text'
            className='taskInput'
          />
          <button onClick={ taskPost } className='postButton'>
            Добавить
          </button>
        </>
      }
    </form>
  );
}

export default TodoForm;