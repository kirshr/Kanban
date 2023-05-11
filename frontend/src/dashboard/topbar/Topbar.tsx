import { FC } from 'react'
import "./Topbar.scss"
import IconVerticalEllipsis from '../../assets/IconVerticalEllipsis'
import Button from '../../components/Button'
import NewTaskForm from '../../components/newTaskForm/NewTaskForm'


interface TopbarProps {
  boardId: string;
  boardColumns: any;
  fetchTasks: () => void;
}

const Topbar: FC<TopbarProps> = ({ boardId, boardColumns, fetchTasks }) => {
  
  const addNewTask = () => {
    const modal = document.getElementById('task-modal') as HTMLDialogElement;
    modal?.showModal();
  }


  return (
    <div className="top-bar">
        <h2>Platform Launch</h2>
      <div className="new-taks">
        <div onClick={addNewTask}>
          <Button btnName='+Add New Task' className='btn-primary_L'/>
        </div>
        <IconVerticalEllipsis/>
      </div>
      <dialog id='task-modal'>
        <NewTaskForm boardId={boardId} boardColumns={boardColumns} fetchTasks={fetchTasks } />
      </dialog>
    </div>
  )
}

export default Topbar;