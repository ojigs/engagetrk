import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { show } from "../services/reducers/modalSlice";
import AddTodo from "../AddTodo";
import Container from "react-bootstrap/Container";
import styles from "./styles.module.css";
import Categories from "../Categories/Categories";
import TodoListItem from "../TodoListItem/TodoListItem";
import UpdateTodo from "../UpdateTodo";

const TodoList = ({ session }) => {
  const dispatch = useDispatch();

  function handleShow() {
    dispatch(show());
  }

  return (
    <>
      <section
        className={`${styles.heroContainer} container-fluid bg-dark mb-3 position-relative`}
      >
        <div className="d-flex justify-content-around align-items-center flex-column flex-md-row">
          <h1 className="col-lg-6 text-white text-center text-md-start">
            Keep track of your engagement for the day
          </h1>
          <img className="" src="./todo.png" alt="keep engagements on track" />
        </div>
      </section>
      <Categories />
      <Container className="position-relative">
        <AddTodo />
        <UpdateTodo />
      </Container>
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
