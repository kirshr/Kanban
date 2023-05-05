import { FC } from 'react'
import LogoLight from '../../assets/LogoLight'

import IconHideSidebar from '../../assets/IconHideSidebar'
import "./Sidebar.scss"
import ThemeBtn from '../../components/theme/ThemeBtn'
import NewBoard from './NewBoardModal/NewBoardModal'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Boards from './Boards/Boards'
interface SidebarProps {
    handleSelectBoard: (e: any) => void;
}

const Sidebar: FC<SidebarProps> = ({ handleSelectBoard }) => {
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        try {
            axios.get("http://localhost:5000/boards")
                .then(res => setBoards(res.data.boards))
        } catch (error) {
            console.log(error);
        }
    }, [])

 
      
  return (
    <div className="sidebar">
        <div className="logo">
            <LogoLight/>
        </div>
        <p>ALL BOARDS ({boards.length})</p>
          <div className="boards">
              <Boards handleSelectBoard={handleSelectBoard} />
          <NewBoard />
          </div>
        <ThemeBtn />
        <div className="hide-sidebar">
            <IconHideSidebar />
            <p>Hide Sidebar</p>    
        </div>    
    </div>
  )
}

export default Sidebar;