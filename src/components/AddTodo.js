import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { hide } from "./services/features/modalSlice";
import { useCreateTodoMutation } from "./services/features/apiSlice";

const AddTodo = ({ onSuccess, show }) => {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [category, setCategory] = useState("personal");
  const [completed, setCompleted] = useState("no");
  const [validated, setValidated] = useState();

  const todoRef = useRef();

  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const handleChangeTodo = (e) => setTodo(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeDueDate = (e) => setDueDate(e.target.value);
  const handleChangeCategory = (e) => setCategory(e.target.value);
  const handleChangeCompleted = (e) => setCompleted(e.target.value);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(hide());

  useEffect(() => {
    if (show) {
      todoRef.current.focus();
    }
  }, [show]);

  const handleAddTodo = useCallback(
    async (e) => {
      const form = e.currentTarget;
      e.preventDefault();

      try {
        if (!form.checkValidity()) {
          e.stopPropagation();
          setValidated(true);
        } else {
          await createTodo({
            todo,
            description,
            completed,
            due_date: dueDate,
            category,
          });

          dispatch(hide());
          setTodo("");
          onSuccess("add");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      createTodo,
      dispatch,
      onSuccess,
      todo,
      category,
      completed,
      dueDate,
      description,
    ]
  );

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add to your list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleAddTodo}>
          <Form.Group
            className="mb-3 d-flex gap-2 align-items-center position-relative"
            controlId="formTodo"
          >
            <Form.Label className="col-3">Todo:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeTodo}
              value={todo}
              ref={todoRef}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Enter a valid Todo
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex gap-2 align-items-center"
            controlId="formDescription"
          >
            <Form.Label className="col-3">Description:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeDescription}
              value={description}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex gap-2 align-items-center position-relative"
            controlId="formDueDate"
          >
            <Form.Label className="col-3">Due Date:</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={handleChangeDueDate}
              value={dueDate}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Please choose a valid due date
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex gap-2 align-items-center"
            controlId="formCategory"
          >
            <Form.Label className="col-3">Category:</Form.Label>
            <Form.Select onChange={handleChangeCategory} value={category}>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex gap-2 align-items-center"
            controlId="formCompleted"
          >
            <Form.Label className="col-3">Completed:</Form.Label>
            <Form.Select onChange={handleChangeCompleted} value={completed}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </Form.Group>
          <Button
            className="mt-5 mb-5 col-12"
            variant="primary"
            type="submit"
            // onClick={handleAddTodo}
            disabled={isLoading}
          >
            <small className="pe-2">ADD TO YOUR LIST</small>
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

export default AddTodo;
