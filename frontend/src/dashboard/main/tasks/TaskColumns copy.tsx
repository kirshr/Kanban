// //import { Draggable } from "react-beautiful-dnd";
// import "./TaskColumns.scss";
// //import { useState } from "react";
// //import TaskDialog from "./TaskDialog";

// interface TaskColumnsProps {
//   boardId: string;
//   onDrop?: (task: Task) => void;
//   fetchTasks: () => void;
//   boards: Board[];
//   colId: string;
// }
// interface Board {
//   _id: string;
//   title: string;
//   tasks: Task[];
//   columns: Column[];
// }
// interface Column {
//   _id: string;
//   name: string;
//   color: string;
// }
// interface Subtask {
//   _id: string;
//   title: string;
//   checked: boolean; // Include the 'checked' property for subtasks
// }

// interface Task {
//   _id: string;
//   title: string;
//   status: string;
//   boardId: string;
//   description: string;
//   subtasks: Subtask[]; // Update the type to use the 'Subtask' interface
//   subtask: string;
//   x: number;
//   y: number;
// }

// const TaskColumns: React.FC<TaskColumnsProps> = ({ boardId, fetchTasks, boards, colId }) => {
//   //console.log("TaskColumns", boards[0].columns);
//   const myTasks = boards[0].tasks;
//   console.log("My Tasks: ", myTasks);
//   console.log("Col ID: ", colId);
//   const filteredTasks = myTasks.filter((task) => task.status === colId && task.boardId === boardId
//   );
//   //console.log("Filtered Tasks: ", filteredTasks);
//   // );


//   // const [selectedTask, setSelectedTask] = useState<Task | undefined>();

//   // const getTaskId = (e: React.MouseEvent<HTMLDivElement>) => {
//   //   const modal = document.querySelector(
//   //     `#task-details-modal-${selectedTask?._id}`
//   //   ) as HTMLDialogElement;
//   //   const taskId = e.currentTarget.dataset.id;
//   //   const taskDetails = filteredTasks.find((task) => task._id === taskId);
//   //   setSelectedTask(taskDetails);
//   //   if (modal) {
//   //     modal.showModal();
//   //   }
//   // };


//   return (
//     <>
//       <h2>test</h2>
//       {/* {filteredTasks.map((task: Task, index) => (
//         <Draggable draggableId={task._id} index={index} key={task._id}>
//           {(provider) => (
//             <div
//               className="task"
//               key={task._id}
//               {...provider.draggableProps}
//               {...provider.dragHandleProps}
//               ref={provider.innerRef}
//               onClick={getTaskId}
//               data-id={task._id}
//             >
//               <h4>{task.title}</h4>
//               <p>0 out of 3 subtasks</p>
//             </div>
//           )}
//         </Draggable>
//       ))}
//       {selectedTask && (
//         <TaskDialog
//           selectedTask={selectedTask}
//           boardColumns={boardColumns}
//           fetchTasks={fetchTasks}
//         />
//       )} */}
//     </>
//   );
// };

// export default TaskColumns;
