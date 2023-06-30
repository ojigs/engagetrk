import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

export const NavLink = (props) => {
  const location = useLocation();

  const isActive = location.pathname === props.to;

  return (
    <Nav.Link as={Link} active={isActive} {...props}>
      {props.children}
    </Nav.Link>
  );
};
