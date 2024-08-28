import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SideBar } from './components/Sidebar'
import { Player } from './components/Player'
import logo from './assets/Logo.png'
import { useSong } from './context/songContext'
import { useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import profileImg from './assets/Profile.png';

function App() {
  const {state} = useSong();
  const {background,isActive} = state;
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    document.body.style.transition = 'background 1s ease';
    document.body.style.background = background;
    console.log(background);

  }, [background]);

  const handleMenu = () => {
    setShowSidebar(!showSidebar);
  }

  return (
    <div className='container'>
      <div className="logo">
        <img src={logo} alt="logo" id='main-img'/>
        <img src={profileImg} alt="profile" id='profile'/>
      </div>
      <div className="menu" onClick={handleMenu}>
        <MenuIcon sx={{
          position: 'relative',
          top: '5vw',
          width: '4rem',
          height: '2rem',
          color: 'grey',
          float : 'right'
        }} />
      </div>
      <div className="music-container">
        <SideBar show={showSidebar}/>
        <Player/>
      </div>
    </div>
  )
}

export default App;