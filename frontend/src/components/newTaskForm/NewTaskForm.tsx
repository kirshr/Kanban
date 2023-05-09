import { FC } from 'react'
import Button from '../Button'
import axios from 'axios'
import { useState } from 'react'
interface NewTaskFormProps {
  boardId?: string,
  boardColumns?: any

}

const NewTaskForm: FC<NewTaskFormProps> = ({ boardId, boardColumns }) => {

  const id = boardId;
  const [task, setTask] = useState({
    title: '',
    description: '',
    subtasks: '',
    status: '',
    boardId: id,
    columnId: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/boards/add', {
        title: task.title,
        description: task.description,
        subtasks: task.subtasks,
        status: task.status,
        boardId: id,
        columnId: task.status,
      });
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
        <input
          type="text"
          name="subtasks"
          value={task.subtasks}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Button className="btn-secondary" btnName="+Add New Subtask" />
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