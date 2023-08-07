import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../services/features/categorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./styles.module.css";

const Categories = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.category);

  const handleSelectCategory = (category) => {
    dispatch(setCategory(category));
  };
  return (
    <>
      <section className="categories container">
        <ListGroup
          horizontal
          className="justify-content-around my-5 flex-wrap gap-3"
        >
          <ListGroup.Item
            onClick={() => handleSelectCategory("all")}
            active={currentCategory === "all"}
          >
            <span
              className={`${styles.categoriesIconBg} border rounded-circle`}
            >
              <FontAwesomeIcon icon={solid("list")} />
            </span>
            <span>All</span>
          </ListGroup.Item>
          <ListGroup.Item
            onClick={() => handleSelectCategory("personal")}
            active={currentCategory === "personal"}
          >
            <span
              className={`${styles.categoriesIconBg} border-primary rounded-circle`}
            >
              <FontAwesomeIcon icon={solid("person")} color="blue" />
            </span>
            <span>Personal</span>
          </ListGroup.Item>
          <ListGroup.Item
            onClick={() => handleSelectCategory("work")}
            active={currentCategory === "work"}
          >
            <span className={`${styles.categoriesIconBg} rounded-circle`}>
              <FontAwesomeIcon icon={solid("briefcase")} color="purple" />
            </span>
            <span>Work</span>
          </ListGroup.Item>
          <ListGroup.Item
            onClick={() => handleSelectCategory("shopping")}
            active={currentCategory === "shopping"}
          >
            <span
              className={`${styles.categoriesIconBg} border-success rounded-circle`}
            >
              <FontAwesomeIcon icon={solid("shopping-cart")} color="green" />
            </span>
            <span>Shopping</span>
          </ListGroup.Item>
          <ListGroup.Item
            onClick={() => handleSelectCategory("health")}
            active={currentCategory === "health"}
          >
            <span
              className={`${styles.categoriesIconBg} border-danger rounded-circle`}
            >
              <FontAwesomeIcon icon={solid("heart")} color="red" />
            </span>
            <span>Health</span>
          </ListGroup.Item>
        </ListGroup>
      </section>
    </>
  );
};

export default Categories;
