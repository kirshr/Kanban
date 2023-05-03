import React, { FC } from 'react'
import { useState } from 'react'
import './NewBoard.scss'
import axios from 'axios'
import IconBoard from '../../../assets/IconBoard'
import NewBoardForm from '../../../components/newBoard/NewBoardForm'
interface NewBoardProps {
  className?: string;
}

const NewBoard: FC<NewBoardProps> = ({ }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    console.log("open modal: ", openModal);
    setOpenModal(!openModal);
  }
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (e.target == document.querySelector('.modal')) {
      setOpenModal(!openModal);;
    }
  }
    
  return (
    <>
      <div className="board-item board-item_new" onClick={handleOpenModal}>
          <IconBoard />
          <p>+Create New Board</p>
      </div>
      <div className={`modal ${openModal ? "open" : ""}`} onClick={closeModal}>
        <NewBoardForm className={openModal ? "open" : ""} />
      </div>
    </>

  )
}

export default NewBoard;