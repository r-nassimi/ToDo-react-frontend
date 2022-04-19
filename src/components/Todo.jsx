import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { MdOutlineCancel } from 'react-icons/md';
import axios from 'axios';
const URL = 'http://localhost:8000';

const Todo = ({ tasks, setTasks }) => {
  const [edit, setEdit] = useState({});

  const updateValue = () => {
    axios.patch(`${URL}/updateTask`, edit).then(res => {
      setTasks(tasks.map(e => (e._id === res.data._id ? res.data : e)));
      setEdit({});
    });
  };

  const deleteTask = (_id) => {
    axios.delete(`${URL}/deleteTask?_id=${_id}`).then(res => {
      setTasks(tasks.filter(e => e._id !== res.data));
    });
  };

  const checkboxChange = (_id, checked) => {
    axios.patch(`${URL}/updateTask`, {
      _id: _id,
      isCheck: !checked
    }).then(res => {
      setTasks(prev => prev.map(item => (item._id === res.data._id ? res.data : item)));
    });
  };

  tasks
    .sort((a, b) => {
      if (a.isCheck === b.isCheck) return 0;
      return (a.isCheck > b.isCheck ? 1 : -1);
    });

  return tasks.map((task, index) => (
    <div className='main'>
      {
        task._id === edit._id ? <div className='editInput'>
          <input
            placeholder='Введите значение'
            value={edit.text}
            onChange={(e) => setEdit({ ...edit, text: e.target.value })}
            name='text'
            className='task-input-edit'
          />
          <MdDone
            onClick={updateValue}
            className='taskEdit'
          />
          <MdOutlineCancel
            onClick={setEdit}
            className='taskCancel'
          />
        </div>
          :
          <div className='card' key={task._id}>
            <input
              id={(`checkbox-${index}`)}
              className='checkbox'
              type={"checkbox"}
              checked={task.isCheck}
              onChange={() => checkboxChange(task._id, task.isCheck)}
            />
            <p className={task.isCheck ? 'text-task isChecked' : 'text-task'} key={(`card-${index}`)}> {task.text} </p>
            <div className='icons'>
              <AiFillDelete
                onClick={() => deleteTask(task._id)}
                className='delete-icon'
              />
              <AiFillEdit
                onClick={() => setEdit(task)}
                className='edit-icon'
              />
            </div>
          </div>
      }
    </div>
  ));
};

export default Todo;