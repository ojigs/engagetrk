import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./styles.module.css";

const Categories = () => {
  return (
    <>
      <section className="categories">
        <ListGroup horizontal className="justify-content-around my-5">
          <ListGroup.Item>
            <span
              className={`${styles.categoriesIconBg} border-primary rounded-circle`}
            >
              <FontAwesomeIcon icon={solid("person")} color="blue" />
            </span>
            <span>Personal</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className={`${styles.categoriesIconBg} rounded-circle`}>
              <FontAwesomeIcon icon={solid("briefcase")} color="purple" />
            </span>
            <span>Work</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span
              className={`${styles.categoriesIconBg} border-success rounded-circle`}
            >
              <FontAwesomeIcon icon={solid("shopping-cart")} color="green" />
            </span>
            <span>Shopping</span>
          </ListGroup.Item>
          <ListGroup.Item>
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
