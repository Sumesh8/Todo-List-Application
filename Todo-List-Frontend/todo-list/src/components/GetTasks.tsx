// Importing necessary dependencies and components from React, Fluent UI, and other modules
import React, { useEffect, useState } from 'react';
import TodoString from "../displayTexts/String.json";
import TodoStyle from "../styleSheets/Todo.style";
import TaskListStyle from "../styleSheets/TaskList.style";
import { Checkbox, FontIcon, Stack, mergeStyles } from '@fluentui/react';
import deleteTask from './deleteTask';
// Importing function to initialize Fluent UI icons
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import TaskDescription from './TaskDescription';
import toggleCompleteStatusOfTask from './toggleCompletedStatusOfTask';
initializeIcons();


// For define the Todo interface,
interface Todo {
  id: number;
  tittle: string;
  description: string;
  status: number;
  userEmail: string;
}

// Functional component representing for fetch and display tasks
const GetTasks = ({ token, completeStatus, setEditTaskId }: { token: string, completeStatus: number, setEditTaskId: React.Dispatch<React.SetStateAction<number | null>> }) => {
  // To store the todos,
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to fetch todos,
  const fetchTodos = async () => {
    try {
      // To include 'email' in the API endpoint and 'token' in the header
      const response = await fetch(`https://localhost:44332/api/todos`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // To filter todos based on completeStatus,
        const filteredTodos = data.todos.$values.filter((todo: Todo) => todo.status === completeStatus);
        setTodos(filteredTodos);
      } else {
        // To handle errors,
        console.error('Failed to fetch todos');
      }
    } catch (error) {
      // To handle errors,
      console.error('Error fetching todos:', error);
    }
  };

  // Function to delete a todo,
  const deleteTodo = async (todoId: number) => {
    await deleteTask(todoId, token);
    // After deleting, fetch and update the todos
    fetchTodos();
  };

  // Function to toggle complete status,
  const toggleCompleteStatus = async (todo: any) => {
    await toggleCompleteStatusOfTask(todo, token);
    // After toggleing, fetch and update the todos
    fetchTodos();
  };


  // useEffect to update storedToken when the 'token' prop changes,
  useEffect(() => {
    fetchTodos();
  }, [token]
  );

  // Function to render individual task cells
  const OnRenderCell = (todo: any) => {
    const statusIcon =
      todo.status === 1 ? (
        <FontIcon
          iconName="ErrorBadge"
          className={TaskListStyle.iconStyle}
          onClick={() => toggleCompleteStatus(todo)}
        />
      ) : (
        <FontIcon iconName="Completed"
          className={TaskListStyle.iconStyle}
          onClick={() => toggleCompleteStatus(todo)}
        />
      );

    const onEditClick = () => {
      // To set the editTaskId state when the EditNote icon is clicked
      setEditTaskId(todo.id);
    };

    return (
      <Stack horizontal key={todo.id} className={TaskListStyle.taskIem}>
        <Stack horizontal style={{ width: "80%" }}>
          <Stack style={{ marginRight: 7 }}>{statusIcon}</Stack>
          <Stack>{todo.tittle}</Stack>
        </Stack>

        <Stack horizontal style={{ width: "20%" }}>

          <TaskDescription todo={todo} />
          <FontIcon
            iconName="EditNote"
            className={TaskListStyle.iconStyle}
            onClick={onEditClick}

          />
          <FontIcon
            iconName="Delete"
            className={TaskListStyle.iconStyle}
            onClick={() => deleteTodo(todo.id)}
          />
        </Stack>
      </Stack>
    );
  };

  // To render component with mapped todos,
  return (
    <div>
      {todos.map(OnRenderCell)}
    </div>
  );
}

export default GetTasks;