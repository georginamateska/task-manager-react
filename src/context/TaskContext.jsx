import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  function handleAddTask(newTask) {
    const payload = { ...newTask, due_date: newTask.dueDate };
    delete payload.dueDate;

    fetch("http://127.0.0.1:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json", //sending json data
      },
      body: JSON.stringify(payload), //konvertnuva newTask in json
    })
      .then((res) => res.json())
      .then((savedTask) => {
        setTasks([...tasks, savedTask]); //everything already in tasks+newTask
      });
  }

  function handleDeleteTask(id) {
  fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
    method: "DELETE",
  }).then(() => {
    setTasks(tasks.filter((task) => task.id !== id));
  });
}

function handleUpdateTask(updatedTask) {
  const payload = { ...updatedTask, due_date: updatedTask.dueDate };
  delete payload.dueDate;

  fetch(`http://127.0.0.1:8000/api/tasks/${updatedTask.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((savedTask) => {
      setTasks(
        tasks.map((task) =>
          task.id === savedTask.id ? savedTask : task
        )
      );

      setEditingTask(null);
    });
}

function handleEditClick(task) {
  setEditingTask(task);
}

function handleCancelEdit() {
  setEditingTask(null);
}

  return (
    <TaskContext.Provider value={{ 
        tasks, 
        setTasks,
        editingTask,
        setEditingTask,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        handleEditClick,
        handleCancelEdit,
        }}
    >
      {children}
    </TaskContext.Provider>
  );
}
