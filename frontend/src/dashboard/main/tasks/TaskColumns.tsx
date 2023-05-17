import { Draggable } from "react-beautiful-dnd";
import "./TaskColumns.scss"
import { useState } from "react";
import TaskDialog from "./TaskDialog";

interface TaskColumnsProps {
  boardId: string;
  column: any;
  onDrop?: (task: Task) => void;
  tasks: Task[];
  boardColumns: any;
  fetchTasks: () => void;
}

interface Task {
  _id: string;
  title: string;
  status: string;
  boardId: string;
  description: string;
  subtasks: string[];
  subtask: string;
  x: number;
  y: number;
}

const TaskColumns: React.FC<TaskColumnsProps> = ({ boardId, column, tasks, boardColumns, fetchTasks }) => {
  const filteredTasks = tasks.filter((task) => task.status === column._id && task.boardId === boardId);

  const [selectedTask, setSelectedTask] = useState<Task>();

  const getTaskId = (e: React.MouseEvent<HTMLDivElement>) => {
    const modal = document.querySelector(`#task-details-modal-${selectedTask?._id}`) as HTMLDialogElement;
    const taskId = e.currentTarget.dataset.id;
    const taskDetails = filteredTasks.find((task) => task._id === taskId);
    setSelectedTask(taskDetails);
    if (modal) {
      modal.showModal();
    }
  };

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
              onClick={getTaskId}
              data-id={task._id}
            >
              <h4>{task.title}</h4>
              <p>0 out of 3 substasks</p>
            </div>
          )}
        </Draggable>
      ))}  
      {selectedTask && (
        <TaskDialog selectedTask={selectedTask} boardColumns={boardColumns} fetchTasks={fetchTasks} />
      )}
    </>
  );
};


export default TaskColumns;
