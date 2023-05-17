import { FC } from 'react'
import IconVerticalEllipsis from "../../../assets/IconVerticalEllipsis";
//import EditTaskDialog from './EditTaskDialog';
import NewTaskForm from '../../../components/newTaskForm/NewTaskForm';
interface TaskDialogProps {
  selectedTask: any;
  boardColumns: any;
  fetchTasks: () => void;
}

const TaskDialog: FC<TaskDialogProps> = ({ selectedTask, boardColumns, fetchTasks }) => {
  const [id, title, description, subtasks] = [selectedTask._id, selectedTask.title, selectedTask.description, selectedTask.subtasks];

  const editTask = () => {
    const editModal = document.querySelector(`#edit-task-dialog-${id}`) as HTMLDialogElement;
    const taskDetailsModal = document.querySelector(`#task-details-modal-${id}`) as HTMLDialogElement;
    taskDetailsModal.close();
    editModal.showModal();

  }
  return (
    <>
      <dialog id={`task-details-modal-${id}`} className='task-dialog'>
        <div className="task-details-title">
          <h4>{title}</h4>
          <div onClick={editTask} className='edit-task'>
            <IconVerticalEllipsis />
          </div>
        </div>
        <div className="task-details-description">
          <p >{description}</p>
          </div>
          <div className="task-details-subtasks">
          <p className="task-subheading">Subtasks (2 of 3)</p>
          {subtasks.map((subtask: any, index: number) => (
            <div key={index}>
              <input
                type="checkbox"
              />
              <p>{subtask.subtask}</p>
            </div>
          ))}
        </div>
        <div className="task-details-status">
          <label htmlFor="status" className="task-subheading">Current Status</label>
            <select name="status" id="status">
              {boardColumns.map((column: any, index: any) => (
                <option key={index} value={column._id}>
                  {column.name}
                </option>
              ))}
          </select>
        </div>
      </dialog>
      <dialog id={`edit-task-dialog-${id}`}>
        <NewTaskForm fetchTasks={fetchTasks} boardColumns={boardColumns} selectedTask={selectedTask} />
      </dialog>
    </>
  )
}

export default TaskDialog;