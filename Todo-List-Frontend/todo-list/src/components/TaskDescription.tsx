// Importing necessary dependencies and components from React, Fluent UI, and other modules
import React from 'react';
import TaskListStyle from '../styleSheets/TaskList.style';
import { FontIcon, TeachingBubble, mergeStyles } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';

// To create interface Todo
interface Todo {
    id: number;
    tittle: string;
    description: string;
    status: number;
    userEmail: string;
}

// Functional component representing for get and display task description,
const TaskDescription: React.FC<{ todo: Todo }> = ({ todo }) => {
    // To store description and titile,
    const { description, tittle } = todo;
    const buttonId = useId('targetButton');
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);

    return (
        <>
            {/* To disable the info icon if task description is not provided */}
            <FontIcon
                id={buttonId}
                iconName="info"
                className={description ? TaskListStyle.iconStyle :
                mergeStyles(TaskListStyle.iconStyle, TaskListStyle.disabled)
                }
                onClick={description ? toggleTeachingBubbleVisible : () => {}}
            />

            {/* To display the description*/}
            {teachingBubbleVisible && (
                <TeachingBubble
                    target={`#${buttonId}`}
                    headline={tittle}
                    onDismiss = {toggleTeachingBubbleVisible}
                >
                    {description}
                </TeachingBubble>
            )}
        </>
    );
};

export default TaskDescription;