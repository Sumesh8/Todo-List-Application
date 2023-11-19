// This is a main style sheet. There are use fliuent ui for the style sheet for easer.

import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";

interface ITodoStyle {
    appContainerForLogin : IStyle;
    headerStyle : IStyle;
    bodyStyleForLogin  : IStyle;
    inputsFormStyle : IStyle;
    emailStyle : IStyle;
    passwordStyle : IStyle;
    submitButtonStyle : IStyle;
    submitAreaStyle : IStyle;
    bottomStyle : IStyle;
    textWhite : IStyle;
    errorMessage: IStyle;
}

const TodoStyle : IProcessedStyleSet<ITodoStyle>  = mergeStyleSets({
    appContainerForLogin : {
        overflow: "hidden", // Hide overflow to contain pseudo-element
        width : 400,
        height : 600, 
        position : "absolute",
        top : "50%",
        left : "50%",
        transform : "translate(-50% , -50%) ",
        borderRadius : 20,
        borderWidth : 5,
        borderStyle: "solid",  
        borderColor: "rgb(76,108,152)",
        boxShadow : 
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        backgroundColor : "rgb(76,108,152)",
    },

    headerStyle : {
        height : 50,
        backgroundColor : "rgb(76,108,152)",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        color : "white",
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
    },

    bodyStyleForLogin  : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        top : "50%",
        height : 350,
    },

    inputsFormStyle : {
        padding : 20,
    },

    emailStyle : {
        width : "100%",
        height : 40,
        borderRadius : 6,
        borderWidth : 5,
        borderColor : "rgb(76,108,152)",
        marginBottom : 20,
    },

    passwordStyle : {
        width : "100%",
        height : 40,
        borderRadius : 6,
        borderWidth : 5,
        borderColor : "rgb(76,108,152)",
        marginBottom : 20,
        color : "rgb(76,108,152)",
    },

    submitAreaStyle : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        color : "rgb(76,108,152)",
    },

    submitButtonStyle : {
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

    bottomStyle : {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 200, 
        backgroundImage: 'url("/Images/bottom.png")', 
        backgroundSize: "contain",
    },

    textWhite : {
        color : "rgb(160, 50, 50)",
    },

    errorMessage : {
        color : "rgb(160, 50, 50)",
        display : "flex",
        justifyContent : "center",
    },

})

export default TodoStyle;