import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "./services/features/modalSlice";
// import { addTodo } from "./services/features/todoSlice";
import { useCreateTodoMutation } from "./services/features/apiSlice";

const AddTodo = ({ onSuccess }) => {
  const [todo, setTodo] = useState("");
  const [createTodo] = useCreateTodoMutation();

  const handleChange = (e) => setTodo(e.target.value);
  const dispatch = useDispatch();

  const show = useSelector((state) => state.modal.show);

  const handleClose = () => dispatch(hide());

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      if (todo.trim() !== "") {
        await createTodo({ todo });

        // dispatch(addTodo(todo));
        dispatch(hide());
        setTodo("");
        onSuccess("add");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add to your list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formTodo"
          >
            <Form.Label className="col-3">Todo:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={todo}
              autoFocus
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formPlace"
          >
            <Form.Label className="col-3">Place:</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formTime"
          >
            <Form.Label className="col-3">Time:</Form.Label>
            <Form.Control type="time"></Form.Control>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formNotification"
          >
            <Form.Label className="col-3">Notification:</Form.Label>
            <Form.Select>
              <option>Yes</option>
              <option>No</option>
            </Form.Select>
          </Form.Group>
          <Button
            className="mt-5 mb-5 col-12 "
            variant="primary"
            type="submit"
            onClick={handleAddTodo}
          >
            <small>ADD TO YOUR LIST</small>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTodo;

// import React, { useState } from "react";
// import { Button, Form, Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { hide } from "./services/features/modalSlice";
// import { addTodo, updateTodo } from "./services/features/todoSlice";

// const AddTodo = () => {
//   const [todo, setTodo] = useState("");

//   const mode = useSelector((state) => state.modal.mode);

//   const todoItems = useSelector((state) => state.todo.todoItems);

//   const handleChange = (e) => setTodo(e.target.value);
//   const dispatch = useDispatch();

//   const show = useSelector((state) => state.modal.show);

//   let todoItem;
//   if (mode !== "add" && todoItems.length) {
//     todoItem = todoItems.find((e) => e.id === mode);
//     // setValue(todoItem.todo);
//     // console.log(todoItem.todo);
//   }

//   const handleClose = () => dispatch(hide());

//   const handleAddTodo = (e) => {
//     e.preventDefault();
//     dispatch(addTodo(todo));
//     dispatch(hide());
//     setTodo("");
//   };

//   const handleUpdateTodo = (e) => {
//     e.preventDefault();
//     dispatch(updateTodo(todo));
//     dispatch(hide());
//     setTodo("");
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>
//           {mode === "add" ? "Add to your list" : "Update todo"}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group
//             className="mb-3 d-flex align-items-center"
//             controlId="formTodo"
//           >
//             <Form.Label className="col-3">Todo:</Form.Label>
//             <Form.Control
//               type="text"
//               onChange={handleChange}
//               value={todoItem}
//               autoFocus
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group
//             className="mb-3 d-flex align-items-center"
//             controlId="formPlace"
//           >
//             <Form.Label className="col-3">Place:</Form.Label>
//             <Form.Control type="text"></Form.Control>
//           </Form.Group>
//           <Form.Group
//             className="mb-3 d-flex align-items-center"
//             controlId="formTime"
//           >
//             <Form.Label className="col-3">Time:</Form.Label>
//             <Form.Control type="time"></Form.Control>
//           </Form.Group>
//           <Form.Group
//             className="mb-3 d-flex align-items-center"
//             controlId="formNotification"
//           >
//             <Form.Label className="col-3">Notification:</Form.Label>
//             <Form.Select>
//               <option>Yes</option>
//               <option>No</option>
//             </Form.Select>
//           </Form.Group>
//           {mode === "add" ? (
//             <Button
//               className="mt-5 mb-5 col-12 "
//               variant="primary"
//               type="submit"
//               onClick={handleAddTodo}
//             >
//               <small>ADD TO YOUR LIST</small>
//             </Button>
//           ) : (
//             <Button
//               className="mt-5 mb-5 col-12 "
//               variant="primary"
//               type="submit"
//               onClick={handleUpdateTodo}
//             >
//               <small>UPDATE TODO</small>
//             </Button>
//           )}
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddTodo;
