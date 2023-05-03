import React, { FC } from 'react'

import axios from 'axios'
import IconBoard from '../../../assets/IconBoard'
interface NewBoardProps {
  
}

const NewBoard: FC<NewBoardProps> = ({ }) => {
    const addNewBoard = async () => {
        try {
          const res = await axios.post('http://localhost:5000/boards', { title: 'New Board' });
          console.log(res.data); // logs the newly created board object
        } catch (error) {
          console.error(error);
        }
      }
      
  return (
    <div className="board-item board-item_new" onClick={addNewBoard}>
        <IconBoard />
        <p>+Create New Board</p>
    </div>
  )
}

export default NewBoard;