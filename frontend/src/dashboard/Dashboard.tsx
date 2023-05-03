import React, { FC } from 'react'

import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import Main from './main/Main'
import NewBoardForm from '../components/newBoard/NewBoardForm'
import "./Dashboard.scss"
interface DashboardProps {
  
}

const Dashboard: FC<DashboardProps> = ({  }) => {
    return (
        <div className='dashboard'>
            <Sidebar/>
            <Topbar/>
            <Main />
            <NewBoardForm />
        </div>

  )
}

export default Dashboard;