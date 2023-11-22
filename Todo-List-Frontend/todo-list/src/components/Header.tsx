// To importing necessary dependencies and components from React,
import React from 'react'
import TodoStyle from "../styleSheets/Todo.style"
import TodoString from "../displayTexts/String.json";

// Functional component representing for header
const Header = () => {
  return (
    // To add header style from Todo Style and add header using Sring.json file
    <div className={TodoStyle.headerStyle}>
      <h2>{TodoString.header}</h2>
    </div>
  )
}

export default Header
