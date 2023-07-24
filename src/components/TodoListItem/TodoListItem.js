import { useDispatch } from "react-redux";
import { Button, Card, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { showUpdate } from "../services/features/modalSlice";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../services/features/apiSlice";
import { useState } from "react";

const TodoListItem = ({ onRemove }) => {
  const dispatch = useDispatch();
  const [deletingId, setDeletingID] = useState(null);
  const { data: todoItems, isLoading, isError, error } = useGetTodosQuery();

  const [deleteTodo, { isError: isDeleteError, error: deleteError }] =
    useDeleteTodoMutation();

  if (isError) console.error(error);
  if (isDeleteError) console.error(deleteError);

  async function handleDeleteTodo(e, id) {
    try {
      setDeletingID(id);
      await deleteTodo(id);
      onRemove("remove");
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingID(null);
    }
  }

  function handleShow(e, id) {
    console.log(id);
    dispatch(showUpdate(id));
  }

  return (
    <>
      <section className="list container">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
            <span className="ms-3">Loading todos...</span>
          </div>
        ) : (
          todoItems?.map((todoItem) => (
            <Card key={todoItem.id} className="col-lg-9  mx-auto mt-4">
              <Card.Body>
                <Card.Text>To do: {todoItem.todo}</Card.Text>
                <Button
                  variant="warning"
                  onClick={(e) => handleShow(e, todoItem.id)}
                >
                  <FontAwesomeIcon icon={solid("pen-to-square")} />
                </Button>
                <Button
                  variant="outline-danger"
                  className="d-inline-block position-absolute"
                  style={{ top: "5px", right: "5px" }}
                  onClick={(e) => handleDeleteTodo(e, todoItem.id)}
                  disabled={deletingId === todoItem.id}
                >
                  {deletingId === todoItem.id ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={solid("trash")} />
                  )}
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </section>
    </>
  );
};

export default TodoListItem;
