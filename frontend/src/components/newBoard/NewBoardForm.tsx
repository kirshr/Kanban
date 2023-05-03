import React, { FC } from 'react'
import Button from '../Button'
import { useState } from 'react'
import axios from 'axios'
import './NewBoardForm.scss'
interface NewBoardFormProps {
  
}
type Board = {
  title: string;
}
const NewBoardForm: FC<NewBoardFormProps> = ({  }) => {
  const [board, setBoard] = useState<Board>({
    title: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBoard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/boards', {title: board.title});
      console.log(res.data)
      setBoard({title: ''})
    } catch (error) {
      
    }
    console.log(board)
  }
    
  return (

        <form action="" className='form' onSubmit={handleSubmit
        }>
          <h3>Add New Board</h3>
            <label htmlFor="name">Name</label>
      <input
        type="text"
        value={board.title}
        onChange={handleInputChange}
        name="title"
      />
          <label htmlFor="columns">Columns</label>
          <div className='board-columns'>
            <input type="text" name='columns' id='columns' placeholder='Todo' />
            <a href="#">X</a>
          </div>
          <div className='board-columns'>
            <input type="text" name='columns' id='columns' placeholder='Todo' />
            <a href="#">X</a>
          </div>
          <div className="form-btns">
            <Button btnName='+Add New Column' className='btn-secondary'/>
            <input type="submit" value={'Create New Board'} />
          </div>
        </form>

  )
}


export default NewBoardForm;