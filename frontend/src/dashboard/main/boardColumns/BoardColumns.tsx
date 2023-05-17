import  { FC } from 'react'
import './BoardColumns.scss';
import TaskColumns from '../tasks/TaskColumns';
import axios from 'axios';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface BoardColumnsProps {
  boardColumns: Column[];
  boardId: string; // make it required
  className?: string;
  tasks: Task[];
  fetchTasks: () => void;
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
  description: string;
  subtasks: string[];
  subtask: string;
  x: number;
  y: number;
};


const BoardColumns: FC<BoardColumnsProps> = ({ boardColumns = [], boardId = '', tasks, fetchTasks }) => {
  const boardTasks = tasks;
    const handleDragEnd = async (result: DropResult) => {
      const end = result.destination?.droppableId;
      const start = result.source.droppableId;
      const taskId = result.draggableId;
      if (start === end) {
        return;
      } else if (start !== end && end !== undefined) {
        const taskToUpdate = boardTasks.filter((task) => task._id === taskId);
        taskToUpdate[0].status = end as string;
        const updatedTasks = taskToUpdate[0];
        try {
          const res = await axios.put(`https://kanban-workflow.herokuapp.com/boards/update/${taskId}`, updatedTasks);
          console.log("Succesfully updated task", res);
          fetchTasks();
        } catch (error) {
          console.log(error);
        }
      }
    };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board-columns-container">
        {boardColumns.map((column: Column) => {
           const columnTasks = boardTasks.filter((task) => task.status === column._id);
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
                   <TaskColumns boardId={boardId} column={column} tasks={tasks} boardColumns={boardColumns} fetchTasks={fetchTasks} />
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


