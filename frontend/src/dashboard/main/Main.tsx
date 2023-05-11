import { FC } from 'react';
import './Main.scss';
import BoardColumns from './boardColumns/BoardColumns';
import EmptyBoard from './emptyBoard/EmptyBoard';
interface Column {
  _id: string;
  name: string;
  color: string;
}

type Task = {
  _id: string;
  title: string;
  status: string;
  boardId: string;
  x: number;
  y: number;
};

interface MainProps {
  boardColumns?: Column[];
  boardId?: string;
  tasks: Task[];
  fetchTasks: () => void;
}
const Main: FC<MainProps> = ({ boardColumns = [], boardId = '', tasks, fetchTasks }) => {
  return (
    <div className="main">
      {boardId === "" ? <EmptyBoard /> : ""}
      <BoardColumns className="board-columns" boardColumns={boardColumns} boardId={boardId} tasks={tasks} fetchTasks={fetchTasks}/>
    </div>
  );
};

export default Main;
