import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { deleteTodo } from "../services/reducers/todoSlice";
import { showUpdate } from "../services/reducers/modalSlice";

const TodoListItem = ({ onRemove }) => {
  const dispatch = useDispatch();

  const todoItems = useSelector((state) => state.todo.todoItems);

  function handleDeleteTodo(e, id) {
    dispatch(deleteTodo({ id: id }));
    onRemove("remove");
  }

  function handleShow(e, id) {
    dispatch(showUpdate(id));
  }

  return (
    <>
      <section className="list container">
        {todoItems.map((todoItem) => (
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
              >
                <FontAwesomeIcon icon={solid("trash")} />
              </Button>
            </Card.Body>
          </Card>
        ))}
      </section>
    </>
  );
};

export default TodoListItem;
