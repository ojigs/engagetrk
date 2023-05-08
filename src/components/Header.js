import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { supabase } from "../utils/api";

const Header = ({ session }) => {
  const [navBackground, setNavBaground] = useState("bg-light");

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  }

  const toogleNavBg = () => {
    setNavBaground(navBackground === "bg-light" ? "bg-info" : "bg-light");
  };

  return (
    <header>
      <Navbar className={`${navBackground} py-2`} expand="lg">
        <Container>
          <Navbar.Brand>
            <img src="./brnd.png" alt="" /> Engagetrk
          </Navbar.Brand>
          {session && (
            <>
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
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
