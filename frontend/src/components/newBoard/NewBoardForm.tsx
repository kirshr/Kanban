import React, { FC } from 'react'
import Button from '../Button'
import './NewBoardForm.scss'
interface NewBoardFormProps {
  
}

const NewBoardForm: FC<NewBoardFormProps> = ({ }) => {

    
  return (
      <div className="modal">
          <form action="" className='form'>
            <input type="text" placeholder="Board Name" />
            <input type="submit" />
          </form>
      </div>
  )
}


export default NewBoardForm;