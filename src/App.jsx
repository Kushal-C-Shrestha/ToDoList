import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import AddTask from './components/AddTask.jsx'
import Page from './components/Page.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Page/>
    <AddTask/>
    
    </>
  )
}

export default App
