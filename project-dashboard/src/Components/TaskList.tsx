import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
