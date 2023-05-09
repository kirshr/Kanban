import { FC } from 'react'
import { useEffect, useState } from 'react'
import IconBoard from '../../../assets/IconBoard'
import axios from 'axios'
interface BoardsProps {
    handleSelectBoard: (e: any) => void;
}

interface Board {
  _id: string;
  title: string;
  // Add any other properties here
}
const Boards: FC<BoardsProps> = ({ handleSelectBoard }) => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/boards").then(res => {
        setBoards(res.data.boards);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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