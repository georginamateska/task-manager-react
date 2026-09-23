import TaskList from "./TaskList";
import AddTask from "./AddTask";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function Dashboard({
  sortedTasks,
  paginatedTasks,
  emptyStateMessage,
  darkMode,
  onDarkMode,
  setSearchItem,
  setStatusFilter,
  statusFilter,
  setSortOrder,
  sortOrder,
  totalTasks,
  completedTasks,
  remainingTasks,
  currentPage,
  totalPages,
  setCurrentPage,
  searchItem,
}) {
  const{
      editingTask,
      handleAddTask,
      handleDeleteTask,
      handleUpdateTask,
      handleCancelEdit,
      handleEditClick,
    } = useContext(TaskContext);

  return (
    <>
      <h1 className="intro">Your Tasks: </h1>

      <div className="dashboard">
        <div className="task-list">
          {sortedTasks.length === 0 ? (
            <p className="empty-state">{emptyStateMessage()}</p>
          ) : (
            <>
              <TaskList tasks={paginatedTasks} />
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>

        <div className="side-bar">
          <div className="search-bar">
            <SearchBar onSearchChange={setSearchItem} searchItem={searchItem}/>
          </div>
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

          <div className="filter-bar">
            <FilterBar
              onFilterChange={setStatusFilter}
              statusFilter={statusFilter}
              onSortChange={setSortOrder}
              sortOrder={sortOrder}
            />

            <div className="statistics">
              <p>Total: {totalTasks}</p>
              <p>Completed Tasks: {completedTasks} </p>
              <p>Remaining Tasks: {remainingTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;