import React from "react";
import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

import MovieDataService from "../services/movies";
import noImage from "../assets/No-image-available.png";

export const MoviesList = () => {
     const [movies, setMovies] = useState([]);
     const [searchTitle, setSearchTitle] = useState("");
     const [searchRating, setSearchRating] = useState("");
     const [ratings, setRatings] = useState(["All Ratings"]);

     const find = (query, by) => {
          MovieDataService.find(query, by)
               .then((response) => {
                    console.log(response.data);
                    setMovies(response.data.movies);
               })
               .catch((e) => {
                    console.log(e);
               });
     };

     const findByTitle = () => {
          find(searchTitle, "title");
     };

     const findByRating = () => {
          if (searchRating === "All Ratings") {
               retrieveMovies();
          } else {
               find(searchRating, "rated");
          }
     };

     const retrieveMovies = () => {
          MovieDataService.getAll()
               .then((response) => {
                    console.log(response.data);
                    setMovies(response.data.movies);
               })
               .catch((e) => {
                    console.log(e);
               });
     };

     const retrieveRatings = () => {
          MovieDataService.getRatings()
               .then((response) => {
                    console.log(response.data);
                    //start with 'All ratings' if user doesn't specify any ratings
                    setRatings(["All Ratings"].concat(response.data));
               })
               .catch((e) => {
                    console.log(e);
               });
     };

     const onChangeSearchTitle = (e) => {
          const searchTitle = e.target.value;
          setSearchTitle(searchTitle);
     };
     const onChangeSearchRating = (e) => {
          const searchRating = e.target.value;
          setSearchRating(searchRating);
     };

     useEffect(() => {
          retrieveMovies();
          retrieveRatings();
     }, []);

     return (
          <div>
               <Container>
                    <Form>
                         <Row>
                              <Col>
                                   <Form.Group>
                                        <Form.Control
                                             type="text"
                                             placeholder="Search by title"
                                             value={searchTitle}
                                             onChange={onChangeSearchTitle}
                                        />
                                   </Form.Group>
                                   <Button
                                        variant="primary"
                                        type="button"
                                        onClick={findByTitle}
                                   >
                                        Search
                                   </Button>
                              </Col>
                              <Col>
                                   <Form.Group>
                                        <Form.Control
                                             as="select"
                                             onChange={onChangeSearchRating}
                                        >
                                             {ratings.map((rating) => {
                                                  return (
                                                       <option value={rating}>
                                                            {rating}
                                                       </option>
                                                  );
                                             })}
                                        </Form.Control>
                                   </Form.Group>
                                   <Button
                                        variant="primary"
                                        type="button"
                                        onClick={findByRating}
                                   >
                                        Search
                                   </Button>
                              </Col>
                         </Row>
                    </Form>

                    <Row>
                         {movies.map((movie) => {
                              return (
                                   <Col>
                                        <Card style={{ width: "18rem" }}>
                                             {movie.poster ? (
                                                  <Card.Img
                                                       src={
                                                            movie.poster +
                                                            "/100px180"
                                                       }
                                                  />
                                             ) : (
                                                  <img
                                                       src={noImage}
                                                       alt="No Image Available"
                                                  />
                                             )}
                                             <Card.Body>
                                                  <Card.Title>
                                                       {movie.title}
                                                  </Card.Title>
                                                  <Card.Text>
                                                       Rating: {movie.rated}
                                                  </Card.Text>
                                                  <Card.Text>
                                                       {movie.plot}
                                                  </Card.Text>
                                                  <Link
                                                       to={
                                                            "/movies/" +
                                                            movie._id
                                                       }
                                                  >
                                                       View Reviews
                                                  </Link>
                                             </Card.Body>
                                        </Card>
                                   </Col>
                              );
                         })}
                    </Row>
               </Container>
          </div>
     );
};
