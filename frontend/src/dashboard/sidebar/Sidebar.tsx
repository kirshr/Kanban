import React, { FC } from 'react'
import LogoLight from '../../assets/LogoLight'
import IconBoard from '../../assets/IconBoard'
import IconHideSidebar from '../../assets/IconHideSidebar'
import "./Sidebar.scss"
import ThemeBtn from '../../components/theme/ThemeBtn'
import NewBoard from './NewBoard/NewBoard'
interface SidebarProps {
  
}

const Sidebar: FC<SidebarProps> = ({  }) => {
  return (
    <div className="sidebar">
        <div className="logo">
            <LogoLight/>
        </div>
        <p>ALL BOARDS (3)</p>
        <div className="boards">
            <div className="board-item board-item_selected">
                <IconBoard />
                <p>Platform Launch</p>
            </div>
            <div className="board-item">
                <IconBoard />
                <p>Marketing Plan</p>
            </div>
            <div className="board-item">
                <IconBoard />
                <p>Roadmap</p>
            </div>
              {/* Add new board */}
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