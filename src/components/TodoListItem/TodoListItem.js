import { Spinner, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import UpdateTodo from "../UpdateTodo";
import TodoCard from "../TodoCard";
import { useGetTodosQuery } from "../services/features/apiSlice";
import { useCallback, useEffect, useState } from "react";

const TodoListItem = ({ handleMessage }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const { data: todoItems, isLoading, isError, error } = useGetTodosQuery();
  const currentCategory = useSelector((state) => state.category);

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

  // define the filteredItems variable and assign the filtered array to it
  const filteredItems = todoItems?.filter(
    (todoItem) =>
      currentCategory === "all"
        ? true // no filtering needed
        : todoItem.category === currentCategory // filter by category
  );

  return (
    <>
      <section className="list container">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
            <span className="ms-3">Loading todos...</span>
          </div>
        ) : (
          filteredItems.map((todoItem) => (
            <TodoCard
              key={todoItem.id}
              todoItem={todoItem}
              handleEditTodo={handleEditTodo}
              handleMessage={handleMessage}
            />
          ))
        )}
        {filteredItems?.length === 0 && ( // check the length of the filtered array and display a message if zero
          <div className="d-flex justify-content-center align-items-center">
            <p>No todos found for {currentCategory} category.</p>
          </div>
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
