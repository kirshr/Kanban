import  { FC } from 'react'
import "./EmptyBoard.scss"
import Button from '../../../components/Button'
import NewBoardForm from '../../../components/newBoard/NewBoardForm'
interface EmptyBoardProps {
  fetchBoards : () => void;
}

const EmptyBoard: FC<EmptyBoardProps> = ({ fetchBoards }) => {
  const AddNewColumn = () => {
    const dialog = document.getElementById('board-modal') as HTMLDialogElement;
    dialog.showModal();
  }
  return (
    <div className='empty-board'>
      <p>This board is empty. Create a new column to get started.</p>
      <div onClick={AddNewColumn}>
        <Button btnName="+Add New Column" className="btn-primary_L" />
      </div>
        <NewBoardForm fetchBoards={fetchBoards}/>
    </div>
  )
}

export default EmptyBoard;