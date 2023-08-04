import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useUpdateTodoMutation } from "./services/features/apiSlice";

const UpdateTodo = ({ todoItem, onSuccess, show, handleClose }) => {
  const todoRef = useRef();
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const [todo, setTodo] = useState(todoItem.todo);
  const [description, setDescription] = useState(todoItem.description);
  const [dueDate, setDueDate] = useState();
  const [category, setCategory] = useState(todoItem.category);
  const [completed, setCompleted] = useState(todoItem.completed);

  const formattedDueDate = todoItem.due_date
    ? new Date(todoItem.due_date).toISOString().substr(0, 10)
    : "";

  useEffect(() => {
    todoRef.current.focus();
    setDueDate(formattedDueDate);
  }, [formattedDueDate]);

  const handleChangeTodo = (e) => setTodo(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeDueDate = (e) => setDueDate(e.target.value);
  const handleChangeCategory = (e) => setCategory(e.target.value);
  const handleChangeCompleted = (e) => setCompleted(e.target.value);

  const handleUpdateTodo = useCallback(
    async (e) => {
      e.preventDefault();
      await updateTodo({
        id: todoItem.id,
        todo,
        description,
        due_date: dueDate,
        category,
        completed,
      });
      handleClose();
      onSuccess("update");
      setTodo("");
      setDescription("");
      setDueDate("");
      setCategory("");
      setCompleted("");
    },
    [
      handleClose,
      onSuccess,
      updateTodo,
      todo,
      todoItem.id,
      category,
      completed,
      description,
      dueDate,
    ]
  );

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
              onChange={handleChangeTodo}
              defaultValue={todo}
              ref={todoRef}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formDescription"
          >
            <Form.Label className="col-3">Description:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeDescription}
              defaultValue={description}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formDueDate"
          >
            <Form.Label className="col-3">Due Date:</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChangeDueDate}
              defaultValue={dueDate}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formCategory"
          >
            <Form.Label className="col-3">Category:</Form.Label>
            <Form.Select
              onChange={handleChangeCategory}
              defaultValue={category}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="formCompleted"
          >
            <Form.Label className="col-3">Completed:</Form.Label>
            <Form.Select
              onChange={handleChangeCompleted}
              defaultValue={completed}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </Form.Group>
          <Button
            className="mt-5 mb-5 col-12"
            variant="primary"
            type="submit"
            onClick={handleUpdateTodo}
            disabled={isLoading}
          >
            <small className="pe-2">UPDATE TODO</small>
            {isLoading && (
              <>
                <small
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></small>
                <span className="sr-only">Loading...</span>
              </>
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTodo;
