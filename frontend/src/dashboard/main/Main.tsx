import { FC } from 'react';
import './Main.scss';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ColumnColor = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${props => props.color};
`;

interface Task {
  _id: string;
  title: string;
  status: string;
  boardId: string;
}

interface Column {
  _id: string;
  name: string;
  color: string;
}

interface MainProps {
  boardColumns?: Column[];
  boardId?: string;
}

const Main: FC<MainProps> = ({ boardColumns = [], boardId = '' }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${boardId}`)
      .then(res => {
        const { tasks } = res.data;
        setTasks(tasks);
      })
      .catch(error => console.error(error));
  }, [boardId]);

  return (
    <div className="main">
      {!boardColumns.length ? (
        <div>
          <p>This board is empty. Create a new column to get started.</p>
          <div>
            <Button btnName="+Add New Column" className="btn-primary_L" />
          </div>
        </div>
      ) : (
        boardColumns.map((column: Column) => (
          <div key={column._id} className='board-column'>
            <p><ColumnColor color={column.color} />{column.name}</p>
            {tasks.map((task: Task) => (
              task.status === column.name && task.boardId === boardId ? (
                <div key={task._id} className='task'>
                  <h4>{task.title}</h4>
                  <p>0 out of 3 substasks</p>
                </div>
              ) : null
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Main;
