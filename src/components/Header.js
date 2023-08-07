import React, { useState, useEffect, useCallback } from "react";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { supabase } from "../utils/api";
import { NavLink } from "./NavLink";

const Header = () => {
  const [navBackground, setNavBaground] = useState("bg-light");

  const [session, setSession] = useState(supabase.auth.getSession());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
    });
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error logging out: ", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const toogleNavBg = () => {
    setNavBaground(navBackground === "bg-light" ? "" : "bg-light");
  };

  return (
    <header>
      <Navbar className={`${navBackground} py-2`} expand="lg">
        <Container>
          <Navbar.Brand>
            <img src="/brnd.png" alt="" /> Engagetrk
          </Navbar.Brand>
          {session && (
            <>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={toogleNavBg}
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto gap-2">
                  <Nav.Item className="">
                    <Nav.Link href="">
                      <FontAwesomeIcon color="#0dcaf0" icon={solid("bell")} />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="">
                    <NavLink to="/">Home</NavLink>
                  </Nav.Item>
                  <Nav.Item className=" bg-info">
                    <Nav.Link
                      onClick={handleLogout}
                      disabled={loading}
                      className=""
                    >
                      <span className="me-2 text-white">Logout</span>
                      {loading && (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            aria-hidden="true"
                            color="white"
                          />
                          <span className="sr-only">Loading...</span>
                        </>
                      )}
                    </Nav.Link>
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
