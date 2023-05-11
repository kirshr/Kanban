import { FC } from 'react'
import Button from '../Button'
import axios from 'axios'
import { useState } from 'react'
import './NewTaskForm.scss'
interface NewTaskFormProps {
  boardId?: string,
  boardColumns?: any
  fetchTasks: () => void;
}
type Subtask = {
  subtask: string,
}

const NewTaskForm: FC<NewTaskFormProps> = ({ boardId, boardColumns, fetchTasks }) => {

  const id = boardId;
  const [task, setTask] = useState({
    title: '',
    description: '',
    subtasks: '',
    status: '',
    boardId: id,
    columnId: '',
  });
  const [subtasks, setSubTask] = useState<Subtask[]>([
    { subtask: '' },
  ])
  //Add new subtasks
  const addNewSubtask = () => {
    setSubTask([...subtasks, { subtask: '' }])
    console.log("add new subtask");
  }
  //Remove subtasks
  const removeColumn = (index: number) => {
    setSubTask(subtasks.filter((_, i) => i !== index));
  };

  //Handle subtask change
const handleSubtaskChange = (e:React.ChangeEvent<HTMLInputElement>,
  index: number) => {
  const { name, value } = e.target;
  const newSubtasks = [...subtasks];
  newSubtasks[index] = { ...newSubtasks[index], [name]: value };
  setSubTask(newSubtasks);
};
    

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put('https://kanban-workflow.herokuapp.com/boards/add', {
        title: task.title,
        description: task.description,
        subtasks: subtasks.map(subtask => ({subtask: subtask.subtask})),
        status: task.status,
        boardId: id,
        columnId: task.status,
      });
      const modal = document.getElementById('task-modal') as HTMLDialogElement;
      modal?.close();
      fetchTasks();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={task.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="subtasks">Subtasks</label>
        {subtasks.map((subtask, index) => (
          <div key={index} className='subtasks'>
            <input
              type="text"
              name="subtask"
              value={subtask.subtask}
              onChange={(e)=> handleSubtaskChange(e, index)}
            />
            <a href="#" onClick={() => removeColumn(index)}>
              X
            </a>
          </div>
        ))}
      </div>
      <div onClick={addNewSubtask}>
        <Button className="btn-secondary" btnName="+Add New Subtask"/>
      </div>
      <div>
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
  );
};
export default NewTaskForm;