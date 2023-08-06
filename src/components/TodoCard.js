import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import moment from "moment";
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "./services/features/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const TodoCard = ({ todoItem, handleEditTodo, handleMessage }) => {
  const { id, todo, description, due_date } = todoItem;

  const [isCompleted, setIsCompleted] = useState(todoItem.completed);
  const [deletingId, setDeletingID] = useState(null);

  const formattedDate = useMemo(() => {
    let dueDate = moment(due_date).format("MMMM Do, YYYY h:mm A");
    return dueDate;
  }, [due_date]);

  useEffect(() => {
    const now = Date.now();
    const due = new Date(due_date).getTime();
    // Compare current time and due date
    if (now > due) {
      // Set completion status to true
      setIsCompleted(true);
    }
  }, [due_date]);

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDeleteTodo = useCallback(
    async (id) => {
      try {
        setDeletingID(id);
        await deleteTodo(id);
        handleMessage("remove");
      } catch (error) {
        console.log(error);
      } finally {
        setDeletingID(null);
      }
    },
    [deleteTodo, handleMessage]
  );

  // Create an event handler that toggles completion status
  const handleToggleCompleted = useCallback(() => {
    setIsCompleted(!isCompleted);
    const updatedTodo = {
      id: id,
      completed: !isCompleted,
    };

    updateTodo(updatedTodo)
      .unwrap()
      .then((response) => {
        handleMessage("update");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleMessage, id, isCompleted, updateTodo]);

  return (
    <Card className="col-lg-9  mx-auto mt-4">
      <Card.Body style={{ opacity: isCompleted ? 0.5 : 1 }}>
        <Card.Title className="fw-bold">{todo}</Card.Title>
        {description && <Card.Text>{description}</Card.Text>}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <Badge bg="primary">Due: {formattedDate}</Badge>
        {isCompleted && <Badge bg="success">Completed</Badge>}
        <div className="d-flex gap-2">
          <Button variant="warning" onClick={() => handleEditTodo(todoItem)}>
            <FontAwesomeIcon icon={solid("pen-to-square")} />
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleDeleteTodo(id)}
            disabled={deletingId === id}
          >
            {deletingId === todoItem.id ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <FontAwesomeIcon icon={solid("trash")} />
            )}
          </Button>
          <Button variant="outline-success" onClick={handleToggleCompleted}>
            <FontAwesomeIcon icon={solid("check")} />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default TodoCard;
