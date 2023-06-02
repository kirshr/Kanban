import { FC } from 'react';
import './Main.scss';
import BoardColumns from './boardColumns/BoardColumns';
import EmptyBoard from './emptyBoard/EmptyBoard';
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
interface Board {
  _id: string;
  title: string;
  tasks: Task[];
  columns: Column[];
}
interface MainProps {
  boardColumns?: Column[];
  boardId?: string;
  tasks: Task[];
  fetchBoards: () => void;
  boards: Board[];
}
const Main: FC<MainProps> = ({ boardId = '', fetchBoards, boards }) => {
  return (
    <div className="main">
      {
        boardId === "" ? <EmptyBoard fetchBoards={fetchBoards}/>
          :
          <BoardColumns className="board-columns" boards={boards} boardId={boardId} fetchBoards={fetchBoards} />
      }
    </div>
  );
};

export default Main;
