import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../../components/services/features/modalSlice";
import AddTodo from "../../components/AddTodo";
import Container from "react-bootstrap/Container";
import styles from "./styles.module.css";
import Categories from "../../components/Categories/Categories";
import TodoListItem from "../../components/TodoListItem/TodoListItem";
import UpdateTodo from "../../components/UpdateTodo";
import Clock from "../../components/Clock";
import Footer from "../../components/Footer";

const TodoList = ({ session }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [variant, setVariant] = useState("");
  const dispatch = useDispatch();
  const showUpdate = useSelector((state) => state.modal.showUpdate.show);
  const showAdd = useSelector((state) => state.modal.show);

  function handleShow() {
    dispatch(show());
  }

  const handleMessage = (operation) => {
    let message, pop;

    switch (operation) {
      case "add":
        message = "Todo added successfully!";
        pop = "success";
        break;
      case "remove":
        message = "Todo removed!";
        pop = "danger";
        break;
      case "update":
        message = "Todo updated successfully!";
        pop = "success";
        break;
      default:
        message = "";
        pop = "";
        break;
    }
    setSuccessMessage(message);
    setVariant(pop);

    // reset the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
      setVariant("");
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
        {showAdd && <AddTodo onSuccess={handleMessage} show={showAdd} />}
        {showUpdate && (
          <UpdateTodo onSuccess={handleMessage} show={showUpdate} />
        )}
      </Container>
      <div className="container">
        {successMessage && (
          <Alert
            variant={variant}
            onClose={() => setSuccessMessage("")}
            dismissible
          >
            {successMessage}
          </Alert>
        )}
      </div>
      <TodoListItem onRemove={handleMessage} />
      <Footer />
      <div className="position-fixed bottom-0 end-0 translate-middle">
        <Button className="btn-lg rounded-circle" onClick={handleShow}>
          <FontAwesomeIcon icon={solid("plus")} />
        </Button>
      </div>
    </>
  );
};

export default TodoList;
