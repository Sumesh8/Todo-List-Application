// To importing necessary dependencies and components from React and other fliuent ui,
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoStyle from "../styleSheets/Todo.style";
import TodoString from "../displayTexts/String.json";
import { Label, Pivot, PivotItem, Stack } from '@fluentui/react';
import { PivotKeysEnum } from '../components/Types';
import GetUserName from '../components/GetUserName';
import GetTasks from '../components/GetTasks';
import TaskForm from '../components/TaskForm';

// Functional component representing for the Home Screen
const HomeScreen = () => {
  // To accessing the current location object,
  const location = useLocation();

  // For extracting token and email from the location state,
  const token = location.state?.token;
  const email = location.state?.email;

  // To state to keep track of the currently selected tab in the Pivot component,
  const [selectedKey, setSelectedKey] = useState<string>(PivotKeysEnum.TaskForm);

// To state to keep track of the currently selected tab in the Pivot component,
const [editTaskId, setEditTaskId] = useState<number | null>(null);

useEffect(() => {
  if (editTaskId) {
    setSelectedKey(PivotKeysEnum.TaskForm);
  }

},[editTaskId])

  return (
    // Main container for the Home Screen
    <div className={TodoStyle.appContainerForHome}>
      <Header />
      <body className={TodoStyle.bodyStyleForHome}>
        {/* Component to display the username */}
        <GetUserName token={token} email={email} />
        {/* Container for the Pivot component */}
        <Stack className={TodoStyle.pivotContainer}>

          <Pivot
            // Setting the selected tab based on the state
            selectedKey={String(selectedKey)}
            styles={{ root: TodoStyle.pivotRoot }}
            onLinkClick={(item?: PivotItem) => {
              // For handling tab click to update the selected tab in the state,
              if (item?.props.itemKey !== PivotKeysEnum.TaskForm){
                setEditTaskId(null);
              }
              setSelectedKey(item?.props.itemKey || PivotKeysEnum.TaskForm);
            }}
            
          >
            {/* Tab for displaying the task form component */}
            <PivotItem headerText={TodoString.pivots.taskFormTab} itemKey={PivotKeysEnum.TaskForm}>
              <TaskForm token={token} editTaskId={editTaskId}/>
            </PivotItem>

            {/* Tab for displaying the incomplete tasks */}
            <PivotItem headerText={TodoString.pivots.tasksTab} itemKey={PivotKeysEnum.Tasks}>
            <GetTasks token={token} completeStatus={0} setEditTaskId={setEditTaskId}/>
            </PivotItem>

            {/* Tab for displaying completed tasks */}
            <PivotItem headerText={TodoString.pivots.completedTab} itemKey={PivotKeysEnum.Completed}>
              <GetTasks token={token} completeStatus={1} setEditTaskId={setEditTaskId}/>
            </PivotItem>
          </Pivot>
        </Stack>
      </body>
      <Footer />
    </div>
  );
}

export default HomeScreen;