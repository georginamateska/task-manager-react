import { useParams, Link } from "react-router-dom";
import AddTask from "./AddTask";
import "./TaskDetail.css";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskDetail({
  darkMode,
  onDarkMode,
  totalTasks,
  completedTasks,
  remainingTasks,
}) {
  const { id } = useParams(); //get the string-id with this

  const {
    tasks,
    handleDeleteTask,
    handleAddTask,
    handleUpdateTask,
    editingTask,
    handleEditClick,
    handleCancelEdit,
  } = useContext(TaskContext);

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className="dashboard">
        <p>Task not found.</p>
        <Link to="/">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <>
      <div className="task-list">
        <div className="back">
          <Link to="/">← Back</Link>
        </div>

        <div className="border">
          <div className="card-large">
            <h1>{task.title}</h1>
            <div className="description-box">
              <p>{task.description}</p>
            </div>
            <p>{task.dueDate}</p>
            <p>{task.priority}</p>
            <p>{task.status}</p>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => handleEditClick(task)}
            className="card-buttons"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete "${task.title}"?`))
                handleDeleteTask(task.id);
            }}
            className="card-buttons"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="wide-side-bar">
        <div className="add-task">
          <AddTask
            onAddTask={handleAddTask}
            initialTask={editingTask}
            onUpdateTask={handleUpdateTask}
            onCancelEdit={handleCancelEdit}
            darkMode={darkMode}
            onDarkMode={onDarkMode}
          />
        </div>
        <div className="wide-filter-bar">
          <div className="statistics">
            <p>Total: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
            <p>Remaining Tasks: {remainingTasks}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetail;
