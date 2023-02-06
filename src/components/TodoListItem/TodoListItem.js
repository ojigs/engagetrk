import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const TodoListItem = () => {
  const todoItems = useSelector((state) => state.todo.todoItems);

  return (
    <>
      <section className="list container">
        {todoItems.map((todoItem) => (
          <Card key={todoItem.id}>
            <Card.Body>To do: {todoItem.todo}</Card.Body>
          </Card>
        ))}
      </section>
    </>
  );
};

export default TodoListItem;
