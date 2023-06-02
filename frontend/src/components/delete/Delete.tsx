import { FC } from 'react'
import Button from '../Button'
import "./delete.scss"
import axios from 'axios'
interface DeleteProps {
  boards: Board[];
  boardId: string;
  fetchBoards: () => void;
}
interface Board {
  _id: string;
  title: string;
}

const Delete: FC<DeleteProps> = ({boards, boardId, fetchBoards}) => {

  const boardToDelete = boards.find(board => board._id === boardId);


  const handleDelete = async () => {
    try {
      const res = await axios.delete(`https://kanban-workflow.herokuapp.com/boards/delete/${boardId}`);
      console.log(res);
      fetchBoards();
      handleCloseDialog();
    } catch (error) {
      console.log("Cannot delete board: " , error);
    }
  }

  const handleCloseDialog = () => {
    const deleteBoardDialog = document.querySelector(".delete") as HTMLDialogElement;
    deleteBoardDialog.close();
  }

  return (
    <div className=''>
      <h4>Delete this board?</h4>
      <p>Are you sure you want to delete the <span className='danger'>{boardToDelete?.title}</span> board? This action will remove all columns and tasks and cannot be reversed.</p>
      <div className='delete-btn-container'>
        <div onClick={handleDelete}>
          <Button btnName='Delete' className='btn-destructive' />
        </div>
        <div onClick={handleCloseDialog}>
          <Button btnName="Cancel" className='btn-secondary' />
        </div>
      </div>
    </div>
  )
}

export default Delete;