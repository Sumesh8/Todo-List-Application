// Importing necessary dependencies and components from React, Fluent UI, and other modules
import React, { useEffect, useState } from 'react';
import TodoString from "../displayTexts/String.json";
import TodoStyle from "../styleSheets/Todo.style";
import TaskListStyle from "../styleSheets/TaskList.style";
import { Checkbox, FontIcon, Stack, mergeStyles } from '@fluentui/react';

// Importing function to initialize Fluent UI icons
import { initializeIcons } from '@fluentui/font-icons-mdl2';
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
const GetTasks = ({ token, completeStatus }: { token: string, completeStatus: number }) => {
  // To store the todos,
  const [todos, setTodos] = useState<Todo[]>([]);

  // useEffect to update storedToken when the 'token' prop changes,
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Include 'email' in the API endpoint or headers as needed
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
    fetchTodos();
  }, [token]
  );

  // Function to render individual task cells
  const OnRenderCell = (todo: any) => {
    const statusIcon =
      todo.status === 1 ? (
        <FontIcon iconName="ErrorBadge" className={TaskListStyle.iconStyle} />
      ) : (
        <FontIcon iconName="Completed" className={TaskListStyle.iconStyle} />
      );

    return (
      <Stack horizontal key={todo.id} className={TaskListStyle.taskIem}>
        <Stack horizontal style={{ width: "85%" }}>
          <Checkbox />
          {todo.tittle}
        </Stack>

        <Stack horizontal style={{ width: "15%" }}>
          {statusIcon}
          <FontIcon iconName="info" className={TaskListStyle.iconStyle} />
          <FontIcon iconName="EditNote" className={TaskListStyle.iconStyle} />
          <FontIcon iconName="Delete" className={TaskListStyle.iconStyle} />
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