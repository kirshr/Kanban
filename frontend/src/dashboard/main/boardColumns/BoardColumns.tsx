import  { FC, useState, useEffect } from 'react'
import './BoardColumns.scss';
import TaskColumns from '../tasks/TaskColumns';
import axios from 'axios';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';




interface BoardColumnsProps {
  boardColumns: Column[];
  boardId: string; // make it required
  className?: string;
}


interface Column {
  _id: string;
  name: string;
  color: string;
}
type Task = {
  _id: string;
  title: string;
  status: string;
  boardId: string;
  x: number;
  y: number;
};

const BoardColumns: FC<BoardColumnsProps> = ({ boardColumns = [], boardId = '' }) => {
  //Get the tasks from the database
  const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
      axios
        .get(`http://localhost:5000/tasks/${boardId}`)
        .then((res) => {
          const { tasks } = res.data;
          setTasks(tasks.map((task: Task) => ({ ...task, x: 0, y: 0 })));
        })
        .catch((error) => console.error(error));
    }, [boardId]);
  
    const handleDragEnd = async (result: DropResult) => {
      console.log(result);
      const end = result.destination?.droppableId;
      console.log(end);
      const start = result.source.droppableId;
      const taskId = result.draggableId;

      if (start === end) {
        return;
      } else if (start !== end && end !== undefined) {
        const taskToUpdate = tasks.filter((task) => task._id === taskId);
        taskToUpdate[0].status = end as string;
        const updatedTasks = taskToUpdate[0];
        try {
          const res = await axios.put(`http://localhost:5000/boards/update/${taskId}`, updatedTasks);
          console.log("Succesfully updated task", res);
        } catch (error) {
          console.log(error);
        }
      }
    };
    console.log(tasks);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board-columns-container">
        {boardColumns.map((column: Column) => {
           const columnTasks = tasks.filter((task) => task.status === column._id);
           return (
          <Droppable droppableId={column._id} key={column._id}>
            {(provided) => (
              <div className="board-column" {...provided.droppableProps} ref={provided.innerRef} col-id={column._id}>
                <p>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: column.color,
                      marginRight: '10px',
                    }}
                  ></span>
                  {column.name}
                  <span>({columnTasks.length})</span>
                </p>
                <TaskColumns boardId={boardId} column={column} tasks={tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )})}
      </div>
    </DragDropContext>
  );
};


export default BoardColumns;


