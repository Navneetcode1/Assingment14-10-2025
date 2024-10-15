import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import { TaskFormValues } from '@/Utils/types';

const ITEMS_PER_PAGE = 5; 

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filter, setFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setModalOpen] = useState(false); 
  const [selectedTask, setSelectedTask] = useState<TaskFormValues | undefined>(undefined);

  
  useEffect(() => {
    let filtered = tasks;
    if (filter !== 'All') {
      filtered = tasks.filter((task) => task.status === filter);
    }
    setFilteredTasks(filtered);
    setCurrentPage(1); 
  }, [filter, tasks]);

  
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  
  const loadMoreTasks = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  
  const handleEditTask = (task: TaskFormValues) => {
    setSelectedTask(task); 
    setModalOpen(true); 
  };

  return (
    <div>
      <div>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select id="statusFilter" onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      
      <ul>
        {paginatedTasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
        ))}
      </ul>

      {paginatedTasks.length < filteredTasks.length && (
        <button onClick={loadMoreTasks}>Load More Tasks</button>
      )}

      {isModalOpen && (
        <TaskModal task={selectedTask} closeModal={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default TaskList;
