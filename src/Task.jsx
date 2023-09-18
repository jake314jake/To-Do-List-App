import React, { useState, useEffect } from 'react';
import fetchData from '../api/api';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';

function Task() {
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isLightTheme, setIsLightTheme] = useState(true);

  const location = useLocation();
  const userName = location.state?.userName || '';
  
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userName);
    fetchData(userName)
      .then((fetchedTasks) => {
        setData(fetchedTasks);
      })
      .catch((error) => console.error(error));
  }, [userName, message]);

  const handleCheckBoxChange = (taskID) => {
    let newSelectedTasks = [...selectedTasks];
    if (selectedTasks.includes(taskID)) {
      newSelectedTasks = selectedTasks.filter((id) => id !== taskID);
    } else {
      newSelectedTasks.push(taskID);
    }
    setSelectedTasks(newSelectedTasks);
  };

  const handleDoneClick = () => {
    if (!selectedTasks.length) return;
    axios
      .post('http://localhost:3000/api/update', { selectedTasks: selectedTasks, userName: userName })
      .then((response) => {
        setMessage('');
        const msg = response.data.message;
        setMessage(msg);
      })
      .then(() => {
        setSelectedTasks([]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleThemeToggle = () => {
    setIsLightTheme(!isLightTheme);
  };
  const handleLogout=()=>{
    navigate('/')
  }
  const handleCheckAll = () => {
    const allTaskIDs = data.map((task) => task.TaskID);
    setSelectedTasks(allTaskIDs);
  };

  const handleAddTask = () => {
    if (newTask === '') return;
    axios
      .post('http://localhost:3000/api/add', { newTask: newTask, userName: userName })
      .then((response) => {
        setMessage('');
        const msg = response.data.message;
        setMessage(msg);
        setNewTask('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

 

  const renderTable = () => {
    return (
      <table className={`table table-striped table-hover ${isLightTheme ? '' : 'table-dark'}`}>
        <thead className={`${isLightTheme ? '' : 'bg-secondary text-light'}`}>
          <tr>
            <th>Task</th>
            <th>Task Creation Time</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr key={task.TaskID}>
              <td>{task.TaskTEXT}</td>
              <td>{task.TaskTIMECreate}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange(task.TaskID)}
                  checked={selectedTasks.includes(task.TaskID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <NavBar userName={userName} handleLogout={handleLogout} />

      <div className={`container mt-5 ${isLightTheme ? '' : 'bg-dark text-light'}`}>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className={`card ${isLightTheme ? '' : 'bg-dark text-light'}`}>
              <div className={`card-header ${isLightTheme ? 'bg-primary' : 'bg-secondary text-light'}`}>
                <h2 className="card-title">Task Manager</h2>
                <button className="btn btn-primary" onClick={handleThemeToggle}>
                     <i className={`bi bi-${isLightTheme ? 'sun' : 'moon'}`} /> 
                    
                </button>

              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control ${isLightTheme ? '' : 'bg-dark text-light'}`}
                    placeholder="Enter a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleAddTask}
                      disabled={newTask === ''}
                    >
                      Add
                    </button>
                  </div>
                </div>
                {renderTable()}
                <button
                  className="btn btn-success mr-2"
                  onClick={handleCheckAll}
                  disabled={data.length === 0}
                >
                  Check All
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleDoneClick}
                  disabled={selectedTasks.length === 0}
                >
                  DONE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
