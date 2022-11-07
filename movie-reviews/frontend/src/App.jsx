import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { AddReview } from "./components/AddReview";
import { MoviesList } from "./components/MoviesList";
import { Movie } from "./components/Movie";
import { Login } from "./components/Login";

//react-router-dom
import { Link } from "react-router-dom";

//bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const App = () => {
     const [user, setUser] = useState(null);

     async function login(user = null) {
          setUser(user);
     }

     async function logout() {
          setUser(null);
     }

     return (
          <>
               <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                         <Nav className="mr-auto">
                              <Link to="/movies">Movies</Link>{" "}
                              {user ? (
                                   <a onClick={logout}>Logout User</a>
                              ) : (
                                   <Link to="/login">Login</Link>
                              )}{" "}
                         </Nav>
                    </Navbar.Collapse>
               </Navbar>
          </>
     );
};
