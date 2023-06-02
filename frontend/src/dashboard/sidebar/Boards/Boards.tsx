import { FC } from 'react'
import IconBoard from '../../../assets/IconBoard'
import DeleteIcon from '../../../assets/iconDelete';
import "./Boards.scss"
interface BoardsProps {
  handleSelectBoard: (e: any) => void;
  boards: Board[];
  boardId: string;
  toggleDialog : () => void;
}
interface Board {
  _id: string;
  title: string;
  // Add any other properties here
}
const Boards: FC<BoardsProps> = ({ handleSelectBoard, boards, boardId, toggleDialog }) => {
  return (
    <>
      {boards.map(board => (
        <div
          className="board-item"
          key={board._id}
          data-board-id={board._id}
          onClick={handleSelectBoard}
        >
          <div>
            <IconBoard />
            <p>{board.title}</p>
          </div>
          <div onClick={toggleDialog}>
           <DeleteIcon boardId={boardId}/>
          </div>
        </div>
      ))}
    </>
  );
};

export default Boards;