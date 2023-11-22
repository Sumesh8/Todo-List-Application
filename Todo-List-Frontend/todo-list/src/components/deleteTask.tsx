// Functional component representing for get delete todo,
const deleteTask = async (todoId: number, token: string) => {
  try {
    // To Include 'todoId' in the API endpoint and 'token' in the heder,
    const response = await fetch(`https://localhost:44332/api/todos/?id=${todoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // To handle errors,
      console.error(`Failed to delete todo with ID ${todoId}`);
    }
  } catch (error) {
    // To handle errors,
    console.error(`Error deleting todo with ID ${todoId}:`, error);
  }
};

export default deleteTask;
