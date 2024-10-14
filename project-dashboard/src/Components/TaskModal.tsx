import { useFormik } from 'formik';
import { taskValidationSchema } from '../Utils/validationSchema';
import { TaskFormValues } from '../Utils/types';
import { useTaskContext } from '../context/TaskContext';

interface TaskModalProps {
  task?: TaskFormValues;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal }) => {
  const { setTasks } = useTaskContext();
  
  const formik = useFormik<TaskFormValues>({
    initialValues: task || {
      title: '',
      description: '',
      assignee: '',
      priority: 'Low',
      status: 'To Do',
      dueDate: '',
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values) => {
      setTasks((prevTasks) => [...prevTasks, { ...values, id: Date.now().toString() }]);
      closeModal();
    },
  });

  return (
    <div className="modal">
      <form onSubmit={formik.handleSubmit}>
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Task Title"
        />
        <input
          name="assignee"
          value={formik.values.assignee}
          onChange={formik.handleChange}
          placeholder="Assignee"
        />
        <select
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          name="dueDate"
          type="date"
          value={formik.values.dueDate}
          onChange={formik.handleChange}
        />
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
};

export default TaskModal;
