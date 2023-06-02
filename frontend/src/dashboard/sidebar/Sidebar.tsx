import { FC } from 'react'

import IconHideSidebar from '../../assets/IconHideSidebar'
import "./Sidebar.scss"
import ThemeBtn from '../../components/theme/ThemeBtn'
import Boards from './Boards/Boards'
import NewBoardForm from '../../components/newBoard/NewBoardForm'
import Spinner from '../../components/spinner/Spinner'

export interface Board {
  _id: string;
  title: string;
}

interface SidebarProps {
    handleSelectBoard: (e: any) => void;
    boards: Board[];
    fetchBoards: () => void;
    loading: boolean
    boardId: string;
    toggleDialog: () => void;
}
const Sidebar: FC<SidebarProps> = ({ handleSelectBoard, boards, fetchBoards, loading, boardId, toggleDialog }) => {
    const Allboards = boards;
    const hideSideBar = () => {
        console.log("Hide me");
        const sidebar = document.querySelector(".sidebar") as HTMLElement;
        sidebar.classList.toggle("hide");
        const hideSidebar = document.querySelector(".hide-sidebar") as HTMLElement;
        hideSidebar.classList.toggle("toggle-sidebar")
        const main = document.querySelector(".main") as HTMLElement;
        main.classList.toggle("toggle-main")
        const logo = document.querySelector(".logo") as HTMLElement;
        logo.classList.toggle("toggle-logo-border-bottom")

    }
    return (
        <>
                {
                    loading ? <Spinner />
                        : 
                    <div className="sidebar">
                        <p>ALL BOARDS{` (${Allboards.length})`}</p>
                        <div className="boards">
                            <Boards
                                handleSelectBoard={handleSelectBoard}
                                boards={Allboards}
                                boardId={boardId}
                                toggleDialog={toggleDialog}
                            />
                            <NewBoardForm fetchBoards={fetchBoards } />
                        </div>
                        <ThemeBtn />
                        <div className="hide-sidebar" onClick={hideSideBar}>
                            <IconHideSidebar />
                            <p>Hide Sidebar</p>
                        </div>
                    </div>

             }

        </>
        
    )
}

export default Sidebar;
