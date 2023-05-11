import { FC } from 'react'
import LogoLight from '../../assets/LogoLight'

import IconHideSidebar from '../../assets/IconHideSidebar'
import "./Sidebar.scss"
import ThemeBtn from '../../components/theme/ThemeBtn'
import Boards from './Boards/Boards'
import NewBoardForm from '../../components/newBoard/NewBoardForm'
export interface Board {
  _id: string;
  title: string;
}

interface SidebarProps {
    handleSelectBoard: (e: any) => void;
    boards: Board[];
    fetchBoards: () => void;
}
const Sidebar: FC<SidebarProps> = ({ handleSelectBoard, boards, fetchBoards }) => {
    const Allboards = boards;
    return (
        <div className="sidebar">
            <div className="logo">
                <LogoLight/>
            </div>
            <p>ALL BOARDS{` (${Allboards.length})`}</p>
            <div className="boards">
                <Boards handleSelectBoard={handleSelectBoard} boards={boards} />
                <NewBoardForm fetchBoards={fetchBoards } />
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
