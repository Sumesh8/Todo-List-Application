import React , { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const HomeScreen = () => {
  const location = useLocation();
  //const token = location.state?.token;

  return (
    <div>
      <h2>This is the Home screen</h2>
    </div>
  )
}

export default HomeScreen
