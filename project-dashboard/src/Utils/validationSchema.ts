import * as Yup from 'yup';

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  dueDate: Yup.date().required('Due date is required'),
  priority: Yup.string().oneOf(['Low', 'Medium', 'High'], 'Invalid priority'),
  status: Yup.string().oneOf(['To Do', 'In Progress', 'Completed'], 'Invalid status'),
});
