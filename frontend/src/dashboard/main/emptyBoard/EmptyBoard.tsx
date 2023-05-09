import  { FC } from 'react'
import "./EmptyBoard.scss"
import Button from '../../../components/Button'
interface EmptyBoardProps {
  
}

const EmptyBoard: FC<EmptyBoardProps> = ({  }) => {
  return (
    <div>
      <p>This board is empty. Create a new column to get started.</p>
      <div>
        <Button btnName="+Add New Column" className="btn-primary_L" />
      </div>
    </div>
  )
}

export default EmptyBoard;