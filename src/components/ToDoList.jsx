import { useEffect, useState, } from 'react';
import ToDoForm from './ToDoForm';
import Todo from './Todo';
import axios from 'axios';
const URL = 'http://localhost:8000';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (!task.text) {
      return;
    }
    setTasks([task, ...tasks]);
  };

  useEffect(() => {
    axios.get(`${URL}/allTasks`).then(res => {
      setTasks(res.data);
    });
  }, []);

  const updateTask = (taskId, newValue) => {
    if (!newValue.text) {
      return;
    }
    setTasks(prev => prev.map(item => (item.id === taskId ? newValue : item)));
  };

  return (
    <>
      <h1>To-Do list</h1>
      <ToDoForm onSubmit={ addTask }
        tasks={ tasks }
        setTasks={ setTasks }
        updateTask={ updateTask }
      />
      <Todo
        tasks={ tasks }
        setTasks={ setTasks }
      />
    </>
  );
}

export default TodoList;