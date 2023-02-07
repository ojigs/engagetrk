import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { deleteTodo } from "../services/reducers/todoSlice";

const TodoListItem = () => {
  const dispatch = useDispatch();

  const todoItems = useSelector((state) => state.todo.todoItems);
  console.log(todoItems);

  function handleDeleteTodo(e, id) {
    console.log(id);
    dispatch(deleteTodo({ id: id }));
  }

  return (
    <>
      <section className="list container">
        {todoItems.map((todoItem) => (
          <Card key={todoItem.id} className="mt-3">
            <Card.Body>
              <Card.Text>To do: {todoItem.todo}</Card.Text>
              <Button variant="warning">
                <FontAwesomeIcon icon={solid("pen-to-square")} />
              </Button>
              <Button
                variant="outline-danger"
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
