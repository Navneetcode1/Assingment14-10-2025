import React from 'react';
import { Task } from '../Utils/types'; // Assuming Task is defined in Utils/types

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  // Styles for flex container (li)
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column', // Items arranged vertically
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    width: '100%',
    maxWidth: '500px',
    margin: '10px auto',
  };

  // Styles for the title
  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    width: '100%', // Make sure title takes full width
  };

  // Style for info items in flex rows
  const infoContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure container takes full width
    marginBottom: '8px',
  };

  const infoLabelStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  const infoValueStyle: React.CSSProperties = {
    fontSize: '1rem',
  };

  // Style for the button container
  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '10px',
  };

  // Style for the button
  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  };

  // Button hover effect
  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    target.style.backgroundColor = '#0056b3';
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    target.style.backgroundColor = '#007bff';
  };

  return (
    <li style={itemStyle}>
      {/* Task Title */}
      <h3 style={titleStyle}>{task.title}</h3>

      {/* Task Info Items */}
      <div style={infoContainerStyle}>
        <div>
          <span style={infoLabelStyle}>Status: </span>
          <span style={infoValueStyle}>{task.status}</span>
        </div>
        <div>
          <span style={infoLabelStyle}>Assignee: </span>
          <span style={infoValueStyle}>{task.assignee}</span>
        </div>
      </div>

      <div style={infoContainerStyle}>
        <div>
          <span style={infoLabelStyle}>Priority: </span>
          <span style={infoValueStyle}>{task.priority}</span>
        </div>
        <div>
          <span style={infoLabelStyle}>Due Date: </span>
          <span style={infoValueStyle}>{task.dueDate}</span>
        </div>
      </div>

      {/* Edit Button */}
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={() => onEdit(task)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Edit
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
