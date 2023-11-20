// This is the task form style sheet. There are use fliuent ui for the style sheet for easer.

import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";

interface ITaskFormStyle {
    submitButtonStyle : IStyle;
    FormBodyStyle: IStyle;

}
const TaskFormStyle : IProcessedStyleSet<ITaskFormStyle> = mergeStyleSets({
    submitButtonStyle : {
        marginLeft : -15,
        width : 100,
        height : 40,
        backgroundColor : "rgb(76,108,152)",
        color : "white",
        fontWeight: "bold",
        borderRadius : 6,
        borderWidth : 5,
        borderColor : "white",
        '&:hover': {
            width: 100,
            height: 40,
            backgroundColor: "white", 
            color: "rgb(160, 50, 50)",
            borderColor : "rgb(160, 50, 50)",
        },
    },

    FormBodyStyle : {
        margin : 10,
    }

})

export default TaskFormStyle;