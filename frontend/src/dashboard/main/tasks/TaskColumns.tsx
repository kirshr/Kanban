//import { Draggable } from "react-beautiful-dnd";
import "./TaskColumns.scss"
import { useState } from "react";
import TaskDialog from "./TaskDialog";

interface TaskColumnsProps {
  columnTasks: Task[];
  boardColumns: any;
  fetchBoards: () => void;
}

interface Task {
  _id: string;
  title: string;
  status: string;
  boardId: string;
  description: string;
  subtasks: Subtask[];
  subtask: string;
  x: number;
  y: number;
}
interface Subtask {
  _id: string;
  title: string;
  checked: boolean; // Include the 'checked' property for subtasks
}
const TaskColumns: React.FC<TaskColumnsProps> = ({ columnTasks, boardColumns, fetchBoards }) => {
  const [selectedTask, setSelectedTask] = useState<Task>();
    const getTaskId = (e: React.MouseEvent<HTMLDivElement>) => {
      const taskId = e.currentTarget.dataset.id;
      const modal = document.querySelector(`#task-details-modal-${taskId}`) as HTMLDialogElement;
      const taskDetails = columnTasks.find((task) => task._id === taskId);
      setSelectedTask(taskDetails);
      if (modal) {
        modal.showModal();
      }
  };
  console.log(selectedTask);
  
  const taskToRender = columnTasks.map((task) => {
    const numOfSubtasks = task.subtasks.length;
    const subtasks = task.subtasks;
    const checkedSubtasks = subtasks.filter((subtask) => subtask.checked === true);
    
    return (
      <div className="task" key={task._id} onClick={getTaskId} data-id={task._id}>
        <h4>{task.title}</h4>
        <p>{checkedSubtasks.length} out of {numOfSubtasks} subtasks</p>
      </div>
    );
  });
  
  return (
    <>
      {taskToRender}
      {selectedTask && <TaskDialog selectedTask={selectedTask} boardColumns={boardColumns} fetchBoards={fetchBoards} />}
    </>
  );
};


export default TaskColumns;