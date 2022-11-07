import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

//react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { MoviesList } from "./components/MoviesList";
import { AddReview } from "./components/AddReview";
import { Movie } from "./components/Movie";

ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/movies" element={<MoviesList />} />
                    <Route
                         path="/movies/:id/review"
                         render={(props) => (
                              <AddReview {...props} user={user} />
                         )}
                    />
                    <Route
                         path="/movies/:id"
                         render={(props) => <Movie {...props} user={user} />}
                    />
                    <Route
                         path="/login"
                         render={(props) => <Login {...props} login={login} />}
                    />
               </Routes>
          </BrowserRouter>
     </React.StrictMode>
);
