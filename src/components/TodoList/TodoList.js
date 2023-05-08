import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { show } from "../services/reducers/modalSlice";
import AddTodo from "../AddTodo";
import Container from "react-bootstrap/Container";
import styles from "./styles.module.css";
import Categories from "../Categories/Categories";
import TodoListItem from "../TodoListItem/TodoListItem";
import UpdateTodo from "../UpdateTodo";
import Clock from "../Clock";

const TodoList = ({ session }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  function handleShow() {
    dispatch(show());
  }

  const handleAddTodoMessage = (todo) => {
    setSuccessMessage("Todo added successfully!");

    // reset the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <>
      <section
        className={`${styles.heroContainer} text-white container-fluid bg-dark mb-3 position-relative`}
      >
        <div className="d-flex justify-content-around align-items-center flex-column flex-md-row">
          <h1 className="col-lg-6 text-center text-md-start">
            Keep track of your engagement for the day
          </h1>
          <img className="" src="./todo.png" alt="keep engagements on track" />
        </div>
      </section>
      <Categories />
      <Clock />
      <Container className="position-relative">
        <AddTodo onSuccess={handleAddTodoMessage} />
        <UpdateTodo />
      </Container>
      <div className="container">
        {successMessage && (
          <Alert
            variant="success"
            onClose={() => setSuccessMessage("")}
            dismissible
          >
            {successMessage}
          </Alert>
        )}
      </div>
      <TodoListItem />
      <div className="position-fixed bottom-0 end-0 translate-middle">
        <Button className="btn-lg rounded-circle" onClick={handleShow}>
          <FontAwesomeIcon icon={solid("plus")} />
        </Button>
      </div>
    </>
  );
};

export default TodoList;
