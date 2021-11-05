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

  const deleteTask = async (id) => await fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'DELETE',
  })
    .then((r) => r.json())
    .then((r) => console.log(r))
    .then(() => getTask());

  return (
    <div className="App">
      <div className='btn-container'>
        <button
          onClick={getTask}
          className='btnGet'
        >
          Exibir todas as tarefas
        </button>
        <button
          onClick={() => setTasks([])}
          className='btnClean'
        >
          Limpar lista de tarefas
        </button>
      </div>
      <div>
        <ul>
          {tasks.map((t, i) => {
            return (
              <li key={i} className='task-li'>
                <span>{t.task} - {t.taskStatus}</span>
                <button
                  className='btnDelete'
                  onClick={() => deleteTask(t._id)}
                >
                  Excluir Tarefa
                </button>
              </li>
            );
          })}
          { console.log(tasks) }
        </ul>
      </div>
    </div>
  );
}

export default App;
// git commit -m 'Listagem de tarefas e botao para deletar tarefa'