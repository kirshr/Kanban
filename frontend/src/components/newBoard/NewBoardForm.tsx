import { FC, useState } from 'react';
import Button from '../Button';
import axios from 'axios';
import './NewBoardForm.scss';

interface NewBoardFormProps {
  className?: string;
}

type Board = {
  title: string;
};

type Column = {
  name: string;
  color: string;
};

const NewBoardForm: FC<NewBoardFormProps> = ({}) => {
  const [board, setBoard] = useState<Board>({
    title: '',
  });

  const [columns, setColumns] = useState<Column[]>([
    { name: 'Todo', color: ''},
    { name: 'Doing', color: ''},
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
    setColumns([...columns, { name: '', color: '' }]);
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/boards', {
        title: board.title,
        columns: columns.map(column => ({ name: column.name, color: column.color })),
      });
      alert('New Board Created');
      console.log(res.data);
      setBoard({ title: '' });
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
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
  );
};

export default NewBoardForm;
