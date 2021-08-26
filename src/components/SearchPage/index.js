import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Button, Card, Row, Col } from 'react-bootstrap';
import '../../App.css';
import { useHistory, useParams } from 'react-router-dom';

const HomePage = () => {
  const [locationResto, setLocationResto] = useState(null);
  const [test, setTest] = useState(false);
  const inputRef = useRef();

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const getResto = await axios.get(`https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${params.term}`, {
        headers: { 'X-API-KEY': '508ab21d1d779c46f1ac0e70d12df02e' }
      });

      if (getResto.data && getResto.data) {
        setLocationResto(getResto.data.data);
      } else {
        setLocationResto(false);
      }
    })();
  }, [test]);

  const handleSearch = () => {
    setTest(inputRef.current.value);
    history.push(`/search/${inputRef.current.value}`);
  }

  const handleIndividual = (id) => {
    history.push(`/details/${id}`);
  }

  return (
    <>
      <input placeholder="search" ref={inputRef} />
      <Button onClick={handleSearch}>Search</Button>
      {(locationResto) ? (
        <Row>
          {locationResto.map(value => (
            <Col xl={3} lg={4} md={4} sm={6} xs={6}>
            <Card className="cardStyle" onClick={() => handleIndividual(value.restaurant_id)}>
              <Card.Title>{value.restaurant_name}</Card.Title>
              <Card.Body>
                Phone: {value.restaurant_phone}
                <br />
                Price range: {value.price_range || "N/A"}
                <br />
                Cuisines: <p>
                  {(value.cuisines.length) ? value.cuisines.map((val) => (
                    <span>{val}, </span>
                  )) : "N/A"}
                </p>
              </Card.Body>
            </Card>
            </Col>
          ))}
        </Row>
      ) : "Search term not found"}
    </>
  )
}

export default HomePage;