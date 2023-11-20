// Importing necessary dependencies and components from React, Fluent UI, and other modules
import { MessageBar, MessageBarType, Stack, TextField } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import useInput from './useInput';
import TaskFormStyle from '../styleSheets/TaskForm.style';
import TodoString from '../displayTexts/String.json';

// Functional component for the task form
const TaskForm = ({ token }: { token: string }) => {
  // State to manage the display of success or error messages,
  const [showMessage, setShowMessage] = useState<{ type: MessageBarType; message: string }>({
    type: MessageBarType.success,
    message: '',
  });

  // Custom hooks to manage input fields,
  const title = useInput('');
  const description = useInput('');

  // useEffect to clear the success message after a certain time,
  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: '' });
      }, 1000);
    }
  }, [showMessage.message, token]);

  // The function for making the POST request to create a task,
  const createTask = async (tittle: string, description: string) => {
    try {
      const response = await fetch('https://localhost:44332/api/todos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tittle,
          description,
          status: 0, // Set the default status to 0 when creating task
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // To hhow success message.
        setShowMessage({ type: MessageBarType.success, message: TodoString.messageBody });
      } else {
        // To show error message,
        setShowMessage({ type: MessageBarType.error, message: 'Failed to create task' });
      }
    } catch (error) {
      console.error('Error creating task:', error);

      // To show error message,
      setShowMessage({ type: MessageBarType.error, message: 'Error creating task' });
    }
  };

  // Function to handle form submission,
  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // To call the createTask function with the form input values,
    createTask(title.value, description.value);
  };

  // To render the task form
  return (
    <form className={TaskFormStyle.FormBodyStyle} onSubmit={onFormSubmit}>
      {/* Text Field for displaying text fiels for titile and description */}
      <TextField label="Title :" required {...title} />
      <TextField label="Description :" multiline rows={4} {...description} />

      {/* Stack for displaying success/error messages and the submit button */}
      <Stack horizontal tokens={{ childrenGap: 20 }} style={{ marginTop: 20 }}>
        {/* Stack for displaying the message bar */}
        <Stack style={{ width: '80%' }}>
          {showMessage.message && (
            <MessageBar messageBarType={showMessage.type}>{showMessage.message}</MessageBar>
          )}
        </Stack>
        {/* Stack for displaying the submit button */}
        <Stack style={{ width: '20%' }}>
          <button type="submit" className={TaskFormStyle.submitButtonStyle}>
            {TodoString.submitTask}
          </button>
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;
