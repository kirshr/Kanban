import { FC } from 'react'
import "./Topbar.scss"
import IconVerticalEllipsis from '../../assets/IconVerticalEllipsis'
import Button from '../../components/Button'
import NewTaskForm from '../../components/newTaskForm/NewTaskForm'


interface TopbarProps {
  boardId: string;
  boardColumns: any;
  fetchBoards: () => void;
}

const Topbar: FC<TopbarProps> = ({ boardId, boardColumns, fetchBoards }) => {
  
  const addNewTask = () => {
    const modal = document.getElementById('task-modal') as HTMLDialogElement;
    modal?.showModal();
  }


  return (
    <div className="top-bar">
        <div className='platform-launch-container'>
          <h2>Platform Launch</h2>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
          </svg>
        </div>
        <div className="new-taks">
          <div onClick={addNewTask}>
          <Button btnName='+Add New Task' className='btn-primary_L' />
          <Button btnName='+' className='btn-primary_L btn-sm' />
        </div>
        <IconVerticalEllipsis/>
        </div>
        <dialog id='task-modal'>
          <NewTaskForm boardId={boardId} boardColumns={boardColumns} fetchBoards={fetchBoards}  />
        </dialog>
    </div>

  )
}

export default Topbar;