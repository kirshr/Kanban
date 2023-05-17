import { FC } from 'react'
import Button from '../Button'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './NewTaskForm.scss'
interface NewTaskFormProps {
  boardId?: string,
  boardColumns?: any
  fetchTasks: () => void;
  selectedTask?: any;
}
type Subtask = {
  subtask: string,
}

const NewTaskForm: FC<NewTaskFormProps> = ({ boardId, boardColumns, fetchTasks,selectedTask }) => {
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
  useEffect(() => {
    if (selectedTask) {
      setSubTask(selectedTask.subtasks);
    }
  }, [selectedTask]);
  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [selectedTask]);

  //Add new subtasks
  const addNewSubtask = () => {
    if (selectedTask) {
      const updatedSubtasks = [...selectedTask.subtasks, { subtask: '' }];
      setSubTask(updatedSubtasks);
      console.log(subtasks);
    } else {
      setSubTask([...subtasks, { subtask: '' }]);
      console.log(subtasks);
    }
  };
  
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
      if (selectedTask) {
        const res = await axios.put(`https://kanban-workflow.herokuapp.com/boards/update/${selectedTask._id}`, {
          title: task.title,
          description: task.description,
          subtasks: subtasks.map(subtask => ({subtask: subtask.subtask})),
          status: task.status,
          boardId: task.boardId,
          columnId: task.status,
        });
        fetchTasks();
        console.log(res);
        const modal = document.getElementById(`edit-task-dialog-${selectedTask._id}`) as HTMLDialogElement;
        modal?.close();
        console.log(modal);
      } else {
        const res = await axios.put(`https://kanban-workflow.herokuapp.com/boards/add`, {
          title: task.title,
          description: task.description,
          subtasks: subtasks.map(subtask => ({subtask: subtask.subtask})),
          status: task.status,
          boardId: id,
          columnId: task.status,
        });
        fetchTasks;
        console.log(res);
        const modal = document.getElementById('task-modal') as HTMLDialogElement;
        modal?.close();
        fetchTasks();
      }
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

  //console.log(task);
  return (
    <form action="" onSubmit={handleSubmit} className='add-new-task-form'>
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
        { subtasks.map((subtask: Subtask, index: number) => (
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
      <div onClick={addNewSubtask} className='add-subclass'>
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
      <div className='submit-task-btn'>
        <input type="submit" value="Save Changes"/>
      </div>
    </form>
  );
};
export default NewTaskForm;