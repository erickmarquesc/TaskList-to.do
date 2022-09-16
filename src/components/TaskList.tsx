import { useState } from 'react';

import '../styles/tasklist.scss'

import { FiTrash, FiPlusCircle } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (!newTaskTitle) return; // newTaskTitle possui o titulo escrito no imput essa linha não permite criar caso o título seja vazio.

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
    setNewTaskTitle(''); // faz com que o imput zere 
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const completeTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task);

    setTasks(completeTask)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // o código vai filtrar as tasks diferente do id que vai ser deletado e retorna eles para o arrey
    const filteredTasks = tasks.filter(tasks => tasks.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <div className='content'>
      <section className="task-list container">

        <header>

          <div className="input-group">
            <input
              type="text"
              placeholder="Adicione uma nova tarefa"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              Criar
              <FiPlusCircle size={16} color="#fff" />
            </button>
          </div>

        </header>

        <main>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" id='item'>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16} />
                </button>
              </li>
            ))}

          </ul>
        </main>

      </section>
    </div>
  )
}