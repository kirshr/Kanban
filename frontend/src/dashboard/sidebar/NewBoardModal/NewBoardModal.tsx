import { FC } from 'react'
import './NewBoardModal.scss'
import IconBoard from '../../../assets/IconBoard'
import NewBoardForm from '../../../components/newBoard/NewBoardForm'

interface NewBoardProps {
  className?: string;
}


const NewBoardModal: FC<NewBoardProps> = ({ }) => {

  const addNewBoard = () => {
    const modal = document.querySelector('#board-modal') as HTMLDialogElement;
    modal?.showModal();
    console.log("clicked");
  }
  
  return (
    <>
      <div className="board-item board-item_new" onClick={addNewBoard}>
          <IconBoard />
          <p>+Create New Board</p>
      </div>
      <dialog id='board-modal'>
        <NewBoardForm  />
      </dialog>
    </>

  )
}

export default NewBoardModal;