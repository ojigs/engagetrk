// import { useDispatch } from "react-redux";
import { Button, Card, Spinner, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import UpdateTodo from "../UpdateTodo";
import TodoCard from "../TodoCard";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../services/features/apiSlice";
import { useCallback, useEffect, useState } from "react";

const TodoListItem = ({ handleMessage }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const [deletingId, setDeletingID] = useState(null);
  const { data: todoItems, isLoading, isError, error } = useGetTodosQuery();

  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    if (isError) console.error(error);
  }, [isError, error]);

  const handleDeleteTodo = useCallback(
    async (e, id) => {
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

  const handleEditTodo = useCallback((todoItem) => {
    setSelectedTodo(todoItem);
    setShowUpdateModal(true);
  }, []);

  const handleClose = () => {
    setShowUpdateModal(false);
    setSelectedTodo();
  };

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
            // <Card key={todoItem.id} className="col-lg-9  mx-auto mt-4">
            //   <Card.Body>
            //     <Card.Text>To do: {todoItem.todo}</Card.Text>
            //     <Button
            //       variant="warning"
            //       onClick={(e) => handleEditTodo(todoItem)}
            //       aria-label="Edit Todo"
            //     >
            //       <FontAwesomeIcon icon={solid("pen-to-square")} />
            //     </Button>
            //     <Button
            //       variant="outline-danger"
            //       className="d-inline-block position-absolute"
            //       // style={{ top: "5px", right: "5px" }}
            //       onClick={(e) => handleDeleteTodo(e, todoItem.id)}
            //       disabled={deletingId === todoItem.id}
            //     >
            //       {deletingId === todoItem.id ? (
            //         <Spinner animation="border" size="sm" />
            //       ) : (
            //         <FontAwesomeIcon icon={solid("trash")} />
            //       )}
            //     </Button>
            //   </Card.Body>
            // </Card>
            <TodoCard
              key={todoItem.id}
              todoItem={todoItem}
              handleEditTodo={handleEditTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleMessage={handleMessage}
            />
          ))
        )}
      </section>
      <Container className="position-relative">
        {showUpdateModal && (
          <UpdateTodo
            onSuccess={handleMessage}
            show={showUpdateModal}
            todoItem={selectedTodo}
            handleClose={handleClose}
          />
        )}
      </Container>
    </>
  );
};

export default TodoListItem;
