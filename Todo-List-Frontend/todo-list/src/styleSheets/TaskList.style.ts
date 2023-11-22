// This is the task list style sheet. There are use fliuent ui for the style sheet for easer.

import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";

interface ITaskListStyle {
    taskIem : IStyle;
    iconStyle : IStyle;
    disabled : IStyle;
 

}
const TaskListStyle : IProcessedStyleSet<ITaskListStyle> = mergeStyleSets({
    taskIem : {
        maxHeight: 50,
        minHeght: 30,
        padding: 10,
        background : "lavender",
        selectors : {
            "&:hover": {background : "rgb(243, 242, 241)" },
        },
        margin : 5,
        display : "flex",
        alignitems : "center",
        boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",

    },

    iconStyle : {
        fontSize: 25,
        margin: '0 3px',
        selectors : {
            "&:hover": {cursor: "pointer" },
        },

    },

    disabled : {
        color: "gray",
        selectors: {
            "&:hover": { cursor: "default"} ,
        },

    },



})

export default TaskListStyle;