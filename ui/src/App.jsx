import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SideBar } from './components/Sidebar'
import { Player } from './components/Player'
import logo from './assets/Logo.png'
import { useSong } from './context/songContext'
import { useEffect } from 'react'

function App() {
  const {state} = useSong();
  const {background} = state;

  useEffect(()=>{
    document.body.style.background = background;

    console.log(background)
  },[background])

  return (
    <div className='container'>
      <div className="logo">
            <img src={logo} alt="logo" />
        </div>
      <div className="music-container">
      <SideBar/>
      <Player/>
      </div>
    </div>
  )
}

export default App
