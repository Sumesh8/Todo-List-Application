// Importing necessary dependencies and components from React, Fluent UI, and other modules
import React, { useEffect, useState } from 'react';
import TodoString from "../displayTexts/String.json";
import TodoStyle from "../styleSheets/Todo.style";
import TaskListStyle from "../styleSheets/Todo.style";

// Functional component repreting for get and display user name
const GetUserName = ({ token , email }: { token: string , email:string }) => {
    // To store the user name
    const [userName, setUserName] = useState<string>('');

    // To update userName,
    useEffect(() => {
        const fetchUserName = async () => {
            try {
              // Include 'email' in the API endpoint or headers as needed
              const response = await fetch(`https://localhost:44332/api/users/${email}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
      
              if (response.ok) {
                const data = await response.json();
                setUserName(data.user);
              } else {
                // To handle errors,
                console.error('Failed to fetch user name');
              }
            } catch (error) {
              // To handle errors,
              console.error('Error during fetch:', error);
            }
          };

          // To calling the fetchUserName function when the component mounts or 'token'/'email' props change
          fetchUserName();
    }, [token, email]
    );
    
    return (
        // To displaying the user name,
        <div className={TodoStyle.UserName}>
            <h3 className={TodoStyle.textRed}>{TodoString.headerHome} {userName}</h3>
        </div>
    );
}

export default GetUserName;