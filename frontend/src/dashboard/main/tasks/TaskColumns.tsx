import  { FC } from 'react'
import "./TaskColumns.scss"
import { useEffect, useState } from 'react'
import axios from 'axios'
interface TaskColumnsProps {
  
}

const TaskColumns: FC<TaskColumnsProps> = ({ }) => {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
    .then(res => setTasks(res.data.tasks))
  }, [])

  console.log(tasks);
  return (
    <div>
      {tasks.map((task: any) => (
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
        ))}
    </div>

  )
}

export default TaskColumns;