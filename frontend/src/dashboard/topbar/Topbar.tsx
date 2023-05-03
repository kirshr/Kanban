import React, { FC } from 'react'
import "./Topbar.scss"
import IconVerticalEllipsis from '../../assets/IconVerticalEllipsis'
import Button from '../../components/Button'
interface TopbarProps {
  
}

const Topbar: FC<TopbarProps> = ({  }) => {
  return (
    <div className="top-bar">
        <h2>Platform Launch</h2>
        <div className="new-taks">
            <Button btnName='+Add New Task' className='btn-primary_L' />
            <IconVerticalEllipsis/>
        </div>
    </div>
  )
}

export default Topbar;