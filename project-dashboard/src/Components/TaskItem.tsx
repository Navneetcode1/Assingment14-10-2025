import { Task } from '../Utils/types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="task-item border p-4 rounded-lg mb-2">
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Assignee: {task.assignee}</p>
      <p>Due Date: {task.dueDate}</p>
    </div>
  );
};

export default TaskItem;
