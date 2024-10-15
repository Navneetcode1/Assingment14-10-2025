import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import { TaskFormValues } from '@/Utils/types';

const ITEMS_PER_PAGE = 5; // Number of items per page

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filter, setFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [selectedTask, setSelectedTask] = useState<TaskFormValues | undefined>(undefined);

  // Filter tasks based on selected status
  useEffect(() => {
    let filtered = tasks;
    if (filter !== 'All') {
      filtered = tasks.filter((task) => task.status === filter);
    }
    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset to first page after filter change
  }, [filter, tasks]);

  // Get the tasks for the current page
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Load more tasks for pagination
  const loadMoreTasks = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Open the modal for editing
  const handleEditTask = (task: TaskFormValues) => {
    setSelectedTask(task); // Set the selected task
    setModalOpen(true); // Open the modal
  };

  return (
    <div>
      {/* Filter by Status */}
      <div>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select id="statusFilter" onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <ul>
        {paginatedTasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
        ))}
      </ul>

      {/* Load More Button for Pagination */}
      {paginatedTasks.length < filteredTasks.length && (
        <button onClick={loadMoreTasks}>Load More Tasks</button>
      )}

      {/* Task Modal for Editing */}
      {isModalOpen && (
        <TaskModal task={selectedTask} closeModal={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default TaskList;
