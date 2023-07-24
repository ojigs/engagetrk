import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { hide } from "./services/features/modalSlice";
import { useCreateTodoMutation } from "./services/features/apiSlice";

const AddTodo = ({ onSuccess, show }) => {
  const [todo, setTodo] = useState("");
  const todoRef = useRef();
  const [createTodo] = useCreateTodoMutation();

  const handleChange = (e) => setTodo(e.target.value);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(hide());

  useEffect(() => {
    if (show) {
      todoRef.current.focus();
    }
  }, [show]);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      if (todo.trim() !== "") {
        await createTodo({ todo: todo });
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
              ref={todoRef}
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
