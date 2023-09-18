import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NameInput from './NameInput';
import Task from './Task';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameInput />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </Router>
  );
}

export default App;
