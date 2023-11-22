// Functional component representing for toggle complete status
const toggleCompleteStatusOfTask =  async (todo : any , token: string) => {
    try {
        // Toggle the status value
        const newStatus = todo.status === 0 ? 1 : 0;
    
        // To toggle status of todo, here include 'todo id' in the API endpoint and 'token' in the heder,
        const response = await fetch(`https://localhost:44332/api/todos?id=${todo.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tittle: todo.tittle,
            description: todo.description,
            status: newStatus,
          }),
        });
    
        if (!response.ok) {
          // To handle errors,
          console.error(`Failed to update todo with ID ${todo.id}`);
        }
      } catch (error) {
        // To handle errors,
        console.error(`Error updating todo with ID ${todo.id}:`, error);
      }
};

export default toggleCompleteStatusOfTask
