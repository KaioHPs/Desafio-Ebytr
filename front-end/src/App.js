import React, { useState } from 'react';
import './App.css';

const myInit = {
  method: 'GET',
};

function App() {
  const [tasks, setTasks] = useState([]);
  
  const getTask = async () => await fetch('http://localhost:3001/tasks', myInit)
    .then((r) => r.json())
    .then((r) => setTasks(r));

  return (
    <div className="App">
      <button onClick={getTask}>Exibir todas as tarefas</button>
      <button onClick={() => setTasks([])}>Limpar lista de tarefas</button>
      <div>
        <ul>
          {tasks.map((t, i) => <li key={i}> {t.task} - {t.taskStatus} </li>)}
          { console.log(tasks) }
        </ul>
      </div>
    </div>
  );
}

export default App;
