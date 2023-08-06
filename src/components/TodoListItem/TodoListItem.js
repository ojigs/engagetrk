import { Spinner, Container } from "react-bootstrap";
import UpdateTodo from "../UpdateTodo";
import TodoCard from "../TodoCard";
import { useGetTodosQuery } from "../services/features/apiSlice";
import { useCallback, useEffect, useState } from "react";

const TodoListItem = ({ handleMessage }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const { data: todoItems, isLoading, isError, error } = useGetTodosQuery();

  useEffect(() => {
    if (isError) console.error(error);
  }, [isError, error]);

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
            <TodoCard
              key={todoItem.id}
              todoItem={todoItem}
              handleEditTodo={handleEditTodo}
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
