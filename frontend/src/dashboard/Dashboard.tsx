import { FC } from 'react'
import { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import Main from './main/Main'
import axios from 'axios'
import "./Dashboard.scss"
interface DashboardProps {
    handleSelectBoard: (e: any) => void;
    boardId: string;
}

const Dashboard: FC<DashboardProps> = ({ }) => {
    const [boardColumns, setBoardColumns] = useState([]);
    const [boardId, setBoardId] = useState('');


    //Add selected class to board item and remove it from other board items, also logs the selected ID
    const handleSelectBoard = (e: any) => {
        const target = e.target;
        const boardItem = target.closest(".board-item");
        const boardItems = document.querySelectorAll(".board-item");
        const boardId = boardItem.dataset.boardId;
        setBoardId(boardId);
        boardItems.forEach((item: any) => {
          item.classList.remove("board-item_selected");
        });
        boardItem.classList.toggle("board-item_selected");
        axios.get(`http://localhost:5000/boards/${boardId}`)
        .then(res => setBoardColumns(res.data.board.columns))
    };
    

    return (
        <div className='dashboard'>
            <Sidebar handleSelectBoard={handleSelectBoard} />
            <Topbar boardId={boardId} boardColumns={boardColumns} />
            <Main boardColumns={boardColumns} boardId={boardId}/>
        </div>

  )
}

export default Dashboard;