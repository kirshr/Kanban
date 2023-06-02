import { FC } from 'react'
import IconVerticalEllipsis from "../../../assets/IconVerticalEllipsis";
//import EditTaskDialog from './EditTaskDialog';
import NewTaskForm from '../../../components/newTaskForm/NewTaskForm';
interface TaskDialogProps {
  selectedTask: any;
  boardColumns: any;
  fetchBoards: () => void;
}

const TaskDialog: FC<TaskDialogProps> = ({ selectedTask, boardColumns, fetchBoards }) => {
  //console.log(selectedTask);
  const editTask = () => {
    const editModal = document.querySelector(`#edit-task-dialog-${selectedTask._id}`) as HTMLDialogElement;
    const taskDetailsModal = document.querySelector(`#task-details-modal-${selectedTask._id}`) as HTMLDialogElement;
    taskDetailsModal.close();
    editModal.showModal();
  }
  return (
    <>
      <dialog id={`task-details-modal-${selectedTask._id}`} className='task-dialog'>
        <div className="task-details-title">
          <h4>{selectedTask.title}</h4>
          <div onClick={editTask} className='edit-task'>
            <IconVerticalEllipsis />
          </div>
        </div>
        <div className="task-details-description">
          <p >{selectedTask.description}</p>
        </div>
          <div className="task-details-subtasks">
          <p className="task-subheading">Subtasks (2 of 3)</p>
          {selectedTask.subtasks.map((subtask: any, index: number) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={subtask.checked}
              />
              <p>{subtask.title}</p>
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
      <dialog id={`edit-task-dialog-${selectedTask._id}`}>
        <NewTaskForm fetchBoards={fetchBoards} boardColumns={boardColumns} selectedTask={selectedTask} />
      </dialog>
    </>
  )
}

export default TaskDialog;