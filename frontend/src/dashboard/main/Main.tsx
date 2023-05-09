import { FC } from 'react';
import './Main.scss';
import BoardColumns from './boardColumns/BoardColumns';

interface Column {
  _id: string;
  name: string;
  color: string;
}

interface MainProps {
  boardColumns?: Column[];
  boardId?: string;
}
// interface Task {
//   _id: string;
//   title: string;
//   status: string;
//   boardId: string;
//   x: number;
//   y: number;
// }
const Main: FC<MainProps> = ({ boardColumns = [], boardId = '' }) => {
  return (
    <div className="main">
      <BoardColumns className="board-columns" boardColumns={boardColumns} boardId={boardId} />
    </div>
  );
};

export default Main;
