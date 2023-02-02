import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Header = () => {
  const [navBackground, setNavBaground] = useState("bg-light");

  const toogleNavBg = () => {
    console.log("clicked navtoggle");
    setNavBaground(navBackground === "bg-light" ? "bg-info" : "bg-light");
  };

  return (
    <header>
      <Navbar className={`${navBackground} py-3`} expand="lg">
        <Container>
          <Navbar.Brand>
            <img src="./brnd.png" alt="" /> Engagetrk
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toogleNavBg}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item className="">
                <Nav.Link href="">
                  <FontAwesomeIcon color="blue" icon={solid("bell")} />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item className="">
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
