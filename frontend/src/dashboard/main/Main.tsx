import React, { FC } from 'react'
import "./Main.scss"
import Button from '../../components/Button'
interface MainProps {
  
}

const Main: FC<MainProps> = ({  }) => {
  return (
    <div className="main">
    <p>This board is empty. Create a new column to get started.</p>
    <Button btnName='+Add New Column' className='btn-primary_L' />
</div>
  )
}

export default Main;