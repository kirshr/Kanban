import { FC, useState, useEffect } from 'react'
import Button from '../../../components/Button';
import "./EditTaskDialog.scss"
//import axios from 'axios';
interface EditTaskDialogProps {
  selectedTask: any;
  boardColumns: any;
}
type Subtask = {
  subtask: string;
};
const EditTaskDialog: FC<EditTaskDialogProps> = ({
  selectedTask, boardColumns }) => {
  const [task, setTask] = useState({
    id: "",
    title: "" ,
    description:"" ,
    subtasks: [] as Subtask[],
    status:"" ,
    boardId: "",
    columnId: '',
  });

  const [subtasks, setSubTask] = useState<Subtask[]>([
    { subtask: '' },
  ])


  useEffect(() => {
    setTask({
      id: selectedTask._id,
      title: selectedTask.title,
      description: selectedTask.description,
      subtasks: selectedTask.subtasks,
      status: selectedTask.status,
      boardId: selectedTask.boardId,
      columnId: selectedTask.columnId,
    })
  }, [selectedTask])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const res = await axios.put()
    console.log(task.subtasks);
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

      //Handle subtask change
  const handleSubtaskChange = (e:React.ChangeEvent<HTMLInputElement>,
    index: number) => {
    const { name, value } = e.target;
    const newSubtasks = [...subtasks];
    newSubtasks[index] = { ...newSubtasks[index], [name]: value };
    setSubTask(newSubtasks);
  };
    

  

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <dialog id={`edit-task-dialog-${task.id}`} className='edit-task-dialog'>
      <form action="" onSubmit={handleSubmit}>
        <h4>Edit Task</h4>
        <label htmlFor="title">Title</label>
        <input type="text" name='title' value={ task.title } onChange={handleInputChange}/>
        <label htmlFor="description">Description</label>
        <textarea name="description" value={task.description} onChange={handleInputChange}>{}</textarea>
        <h5>Subtasks</h5>
        {subtasks.map((subtask: any, index: number) => (
          <div key={index} className='subtasks'>
            <input
              type="text"
              name="subtask"
              value={subtask.subtask}
              onChange={(e)=> handleSubtaskChange(e, index)}
            />
            <a href="#">
              X
            </a>
          </div>
        ))}
        <div >
          <Button className="btn-secondary" btnName="+Add New Subtask"/>
        </div>
        <div className="edit-task-status">
          <label htmlFor="status">Status</label>
          <select name="status" id="status" onChange={handleSelectChange}>
            <option value="" defaultValue={''}></option>
            {boardColumns.map((column: any, index: any) => (
              <option key={index} value={column._id}>
                {column.name}
               </option>
            ))}
          </select>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </dialog>
  )
}

export default EditTaskDialog;