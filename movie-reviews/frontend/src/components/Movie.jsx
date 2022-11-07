import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import { useEffect } from "react";

//bootstrap
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// import Media from "react-bootstrap/Media";

export const Movie = () => {
     const [movie, setMovie] = useState({
          id: null,
          title: "",
          rated: "",
          reviews: [],
     });

     const getMovie = (id) => {
          MovieDataService.get(id)
               .then((response) => {
                    setMovie(response.data);
                    console.log(response.data);
               })
               .catch((e) => {
                    console.log(e);
               });
     };

     useEffect(() => {
          getMovie(props.match.params.id);
     }, [props.match.params.id]);

     return (
          <div>
               <Container>
                    <Row>
                         <Col>
                              <Image src={movie.poster + "/100px250"} fluid />
                         </Col>
                         <Col>
                              <Card>
                                   <Card.Header as="h5">
                                        {movie.title}
                                   </Card.Header>
                                   <Card.Body>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        {props.user && (
                                             <Link
                                                  to={
                                                       "/movies/" +
                                                       props.match.params.id +
                                                       "/review"
                                                  }
                                             >
                                                  Add Review
                                             </Link>
                                        )}
                                   </Card.Body>
                              </Card>
                              <br />
                              <h2>Reviews</h2>
                         </Col>
                    </Row>
               </Container>
          </div>
     );
};
