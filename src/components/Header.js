import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { supabase } from "../utils/api";
// import { Link } from "react-router-dom";

const Header = () => {
  const [navBackground, setNavBaground] = useState("bg-light");

  const [session, setSession] = useState(supabase.auth.getSession());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
    });
  }, []);

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      window.history.replaceState({}, null, "/");
    } catch (error) {
      console.error("Error logging out: ", error.message);
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
                    <Nav.Link>Home</Nav.Link>
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
