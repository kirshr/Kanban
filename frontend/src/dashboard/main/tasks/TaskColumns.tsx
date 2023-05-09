import { Draggable } from "react-beautiful-dnd";
import "./TaskColumns.scss"
interface TaskColumnsProps {
  boardId: string;
  column: any;
  onDrop?: (task: Task) => void;
  tasks: Task[];
}

interface Task {
  _id: string;
  title: string;
  status: string;
  boardId: string;
  x: number;
  y: number;
}

const TaskColumns: React.FC<TaskColumnsProps> = ({ boardId, column, tasks }) => {
  const filteredTasks = tasks.filter((task) => task.status === column._id && task.boardId === boardId);

  return (
    <>
      {filteredTasks.map((task: Task, index) => (
        <Draggable draggableId={task._id} index={index} key={task._id}>
          {(provider) => (
            <div
              className="task"
              key={task._id}
              {...provider.draggableProps}
              {...provider.dragHandleProps}
              ref={provider.innerRef}
            >
              <h4>{task.title}</h4>
              <p>0 out of 3 substasks</p>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};


export default TaskColumns;
