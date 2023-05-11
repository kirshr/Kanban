import { FC } from 'react'
import { useState, useEffect } from 'react'
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import Main from './main/Main'
import axios from 'axios'
import "./Dashboard.scss"

interface DashboardProps {

}
interface Board {
  _id: string;
  title: string;
}

type Task = {
  _id: string;
  title: string;
  status: string;
  boardId: string;
  x: number;
  y: number;
};

const Dashboard: FC<DashboardProps> = ({ }) => {
    const [boardColumns, setBoardColumns] = useState([]);
    const [boardId, setBoardId] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  
    //Get all boards
    const [boards, setBoards] = useState<Board[]>([]);
    useEffect(() => {
      try {
        axios.get("https://kanban-workflow.herokuapp.com/boards").then(res => {
          setBoards(res.data.boards);

        });
      } catch (error) {
        console.log(error);
      }
    }, []);
  
  //Update boards when a new board is added
  const fetchBoards = () => {
    axios.get("https://kanban-workflow.herokuapp.com/boards").then(res => {
      setBoards(res.data.boards);
    });
  };
    useEffect(() => {
      try {
        axios.get("https://kanban-workflow.herokuapp.com/boards").then(res => {
          setBoards(res.data.boards);

        });
      } catch (error) {
        console.log(error);
      }
    }, [setBoards]);
  
    //Get tasks from DB for the selected board
    useEffect(() => {
      axios
        .get(`https://kanban-workflow.herokuapp.com/tasks/${boardId}`)
        .then((res) => {
          const { tasks } = res.data;
          setTasks(tasks.map((task: Task) => ({ ...task, x: 0, y: 0 })));
        })
        .catch((error) => console.error(error));
    }, [boardId]);
  
  const fetchTasks = () => {
    axios.get(`https://kanban-workflow.herokuapp.com/tasks/${boardId}`).
      then((res) => {
        const { tasks } = res.data;
        setTasks(tasks.map((task: Task) => ({ ...task, x: 0, y: 0 })));
      })
      .catch((error) => console.error(error));
  };

  //Update tasks when a new task is added
  useEffect(() => {
    axios
      .get(`https://kanban-workflow.herokuapp.com/tasks/${boardId}`)
      .then((res) => {
        const { tasks } = res.data;
        setTasks(tasks.map((task: Task) => ({ ...task, x: 0, y: 0 })));
      })
      .catch((error) => console.error(error));
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
    
  
  


  
    return (
        <div className='dashboard'>
        <Sidebar handleSelectBoard={handleSelectBoard} boards={boards} fetchBoards={fetchBoards} />
        <Topbar boardId={boardId} boardColumns={boardColumns} fetchTasks={fetchTasks} />
        <Main boardColumns={boardColumns} boardId={boardId} tasks={tasks}fetchTasks={fetchTasks} />
        </div>

  )
}

export default Dashboard;