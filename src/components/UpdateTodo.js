import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideUpdate } from "./services/features/modalSlice";
import { updateTodo } from "./services/features/todoSlice";

const UpdateTodo = ({ onSuccess }) => {
  const todoId = useSelector((state) => state.modal.showUpdate.id);
  const todos = useSelector((state) => state.todo.todoItems);
  const todoItem = todos.find((e) => e.id === todoId);
  const show = useSelector((state) => state.modal.showUpdate.show);
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (show && todoItem) {
      setTodo(todoItem.todo);
    }
  }, [show, todoItem]);

  const handleChange = (e) => setTodo(e.target.value);

  const handleClose = () => dispatch(hideUpdate());

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: todoItem.id, todo: todo }));
    dispatch(hideUpdate());
    onSuccess("update");
    setTodo("");
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update todo</Modal.Title>
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
            onClick={handleUpdateTodo}
          >
            <small>UPDATE TODO</small>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTodo;
