import { FC } from 'react'
import { useState, useEffect } from 'react'
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import Main from './main/Main'
import axios from 'axios'
import LogoLight from '../assets/LogoLight'
import "./Dashboard.scss"
import Delete from '../components/delete/Delete'
import LogoMobile from '../assets/LogoMobile'

interface DashboardProps {

}
interface Board {
  _id: string;
  title: string;
  tasks: Task[];
  columns: Column[];
}
interface Column {
  _id: string;
  name: string;
  color: string;
}
interface Subtask {
  _id: string;
  title: string;
  checked: boolean;
}
type Task = {
  _id: string;
  title: string;
  status: string;
  boardId: string;
  description: string;
  subtasks: Subtask[];
  subtask: string;
  x: number;
  y: number;
};

const Dashboard: FC<DashboardProps> = ({ }) => {
    const [boardColumns, setBoardColumns] = useState([]);
    const [boardId, setBoardId] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

  //Get all boards
  const [boards, setBoards] = useState<Board[]>([]);
  useEffect(() => {
    try {
      setLoading(true);
      axios.get("https://kanban-workflow.herokuapp.com/boards").then(res => {
        setBoards(res.data.boards);
      });
      console.log("Boards have been loaded");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Update boards when a new board is added
  const fetchBoards = () => {
    axios.get("https://kanban-workflow.herokuapp.com/boards").then(res => {
      setBoards(res.data.boards);
      console.log("Boarrds have been updated");
    });
    console.log("Boarrds have been updated");
  };

  useEffect(() => {
    try {
      axios.get("https://kanban-workflow.herokuapp.com/boards").then(res => {
        setBoards(res.data.boards);
        console.log("Boarrds have been updated");
      });
    } catch (error) {
      console.log(error);
    }
  }, [setBoards]);

  useEffect(() => {
    try {
      axios.get(`https://kanban-workflow.herokuapp.com/boards/tasks/board/${boardId}`).then(res => {
        setTasks(tasks.map((task: Task) => ({ ...task, x: 0, y: 0 })));
        console.log("Tasks have been updated", res);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setTasks]);
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
      axios.get(`https://kanban-workflow.herokuapp.com/boards/${boardId}`)
      .then(res => setBoardColumns(res.data.board.columns))
  };
  
    const handleDeleteDialog = () => {
      const deleteBoardDialog = document.querySelector(".delete") as HTMLDialogElement;
      deleteBoardDialog.showModal();
    }
    
  
    return (
      <div className='dashboard'>
          <div className="logo">
          <LogoLight />
          <LogoMobile />
          </div>
        <Sidebar
          handleSelectBoard={handleSelectBoard}
          boards={boards}
          fetchBoards={fetchBoards}
          loading={loading}
          boardId={boardId}
          toggleDialog={handleDeleteDialog}
        />
        <Topbar
          boardId={boardId}
          boardColumns={boardColumns}
          fetchBoards={fetchBoards}
        />
        <Main
          boardColumns={boardColumns}
          boardId={boardId}
          tasks={tasks}
          fetchBoards={fetchBoards}
          boards={boards}
        />
        <dialog className='delete'>
          <Delete boards={boards} boardId={boardId} fetchBoards={fetchBoards} />
        </dialog>
        </div>

  )
}

export default Dashboard;