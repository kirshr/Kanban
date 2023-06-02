import  { FC } from 'react'
import './BoardColumns.scss';
import TaskColumns from '../tasks/TaskColumns';

interface BoardColumnsProps {
  boardId: string; // make it required
  className?: string;
  fetchBoards: () => void;
  boards: Board[];
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
  checked: boolean; // Include the 'checked' property for subtasks
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


const BoardColumns: FC<BoardColumnsProps> = ({ boards, boardId, fetchBoards }) => {
  const myBoard = boards.filter(board => board._id === boardId);

  const boardTasks = myBoard[0]?.tasks;
  //console.log("Board Tasks: ",boardTasks);
  if (!boardTasks) {
    return null;
  }
  const boardColumns = myBoard[0].columns;
  //console.log(boardColumns);


  return (

      <div className="board-columns-container">
        {boardColumns.map((column: Column) => {
          const columnTasks = boardTasks.filter((task) => task.status === column._id);
          //console.log("Column Tasks: ", columnTasks);
           return (
              <div className="board-column" col-id={column._id}>
                <p>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: column.color,
                      marginRight: '10px',
                    }}
                  ></span>
                  {column.name}
                  <span>({columnTasks.length})</span>
                </p>
               <TaskColumns columnTasks={columnTasks} boardColumns={boardColumns} fetchBoards={fetchBoards} />
              </div>
            )}
        )}
      </div>

  );
};


export default BoardColumns;


