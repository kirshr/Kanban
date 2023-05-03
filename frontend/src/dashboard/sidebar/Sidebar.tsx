import React, { FC } from 'react'
import LogoLight from '../../assets/LogoLight'
import IconBoard from '../../assets/IconBoard'
import IconHideSidebar from '../../assets/IconHideSidebar'
import "./Sidebar.scss"
import ThemeBtn from '../../components/theme/ThemeBtn'
import NewBoard from './NewBoard/NewBoard'
import { useEffect, useState } from 'react'
import axios from 'axios'
interface SidebarProps {
  
}

const Sidebar: FC<SidebarProps> = ({ }) => {
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        try {
            axios.get("http://localhost:5000/boards")
                .then(res => setBoards(res.data.boards))
        } catch (error) {
            console.log(error);
        }
    }, [boards])

    const handleSelectBoard = (e: any) => {
        const target = e.target;
        const boardItem = target.closest(".board-item");
        const boardItems = document.querySelectorAll(".board-item");
        boardItems.forEach((item: any) => {
            item.classList.remove("board-item_selected");
        })
        boardItem.classList.toggle("board-item_selected");

    

    }

  return (
    <div className="sidebar">
        <div className="logo">
            <LogoLight/>
        </div>
        <p>ALL BOARDS (3)</p>
          <div className="boards">
              {boards.map((board: any) => (
                  <div className="board-item" key={board._id} onClick={handleSelectBoard}>
                        <IconBoard />
                        <p>{board.title}</p>
                    </div>
              ))}
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