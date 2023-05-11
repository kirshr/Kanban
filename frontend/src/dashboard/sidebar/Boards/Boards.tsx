import { FC } from 'react'
import IconBoard from '../../../assets/IconBoard'
interface BoardsProps {
  handleSelectBoard: (e: any) => void;
  boards: Board[];
}
interface Board {
  _id: string;
  title: string;
  // Add any other properties here
}
const Boards: FC<BoardsProps> = ({ handleSelectBoard, boards }) => {
  return (
    <>
      {boards.map(board => (
        <div
          className="board-item"
          key={board._id}
          data-board-id={board._id}
          onClick={handleSelectBoard}
        >
          <IconBoard />
          <p>{board.title}</p>
        </div>
      ))}
    </>
  );
};

export default Boards;