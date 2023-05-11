import { FC, useState } from 'react';
import Button from '../Button';
import axios from 'axios';
import './NewBoardForm.scss';
import IconBoard from '../../assets/IconBoard';
interface NewBoardFormProps {
  className?: string;
  fetchBoards: () => void;
}

type Board = {
  title: string;
  _id?: string;
};

type Column = {
  name: string;
  color: string;
};

const NewBoardForm: FC<NewBoardFormProps> = ({fetchBoards}) => {
  const [board, setBoard] = useState<Board>({
    title: '',
  });

  const [columns, setColumns] = useState<Column[]>([
    { name: 'Todo', color: '#FFFFFF'},
    { name: 'Doing', color: '#FFFFFF'},
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value }));
  };

  //Color Picker for Columns
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

  const handleColorChange = (index: number, color: string) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], color: color };
    setColumns(newColumns);
    console.log(currentColorIndex);
  };

  const handleColumnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [name]: value };
    setColumns(newColumns);
  };


  const addNewColumn = () => {
    setColumns([...columns, { name: '', color: '#FFFFFF' }]);
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://kanban-workflow.herokuapp.com/boards', {
        title: board.title,
        columns: columns.map(column => ({ name: column.name, color: column.color })),
      });
      const modal = document.querySelector('#board-modal') as HTMLDialogElement;
      modal?.close();
      console.log(res.data);
      setBoard({ title: '' });
      fetchBoards();
    } catch (error) {
      console.log(error);
    }
  };
  
  const addNewBoard = () => {
    const modal = document.querySelector('#board-modal') as HTMLDialogElement;
    modal?.showModal();
  }

  return (
    <>
      <div className="board-item board-item_new" onClick={addNewBoard}>
        <IconBoard />
        <p>+Create New Board</p>
      </div>
      <dialog id='board-modal'>
        <form action="" className="form" onSubmit={handleSubmit}>
          <h3>Add New Board</h3>
          <label htmlFor="name">Name</label>
          <div className="board-title-input">
            <input
              type="text"
              value={board.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <label htmlFor="columns">Columns</label>
          {columns.map((column, index) => (
            <div className="board-columns" key={index}>
              <input 
                type="color" 
                value={column.color} 
                onChange={(e) => {
                  setCurrentColorIndex(index);
                  handleColorChange(index, e.target.value);
                }} 
                className='color-picker'/>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Todo"
                value={column.name}
                onChange={(e) => handleColumnChange(e, index)}
              />
              <a href="#" onClick={() => removeColumn(index)}>
                X
              </a>
            </div>
          ))}
          <div className="form-btns">
            <div onClick={addNewColumn}>
              <Button
                btnName="+Add New Column"
                className="btn-secondary"
              />
            </div>
            <input type="submit" value={'Create New Board'} />
          </div>
        </form>
      </dialog>
    </>
  );
};

export default NewBoardForm;
