import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Button, Card, Row, Col } from 'react-bootstrap';
import '../../App.css';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const [locationResto, setLocationResto] = useState(null);
  const [test, setTest] = useState(false);
  const inputRef = useRef();

  const history = useHistory();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        (async () => {
          let testLat = "40.68919";
          let testLon = "-73.992378";
          const getResto = await axios.get(`https://api.documenu.com/v2/restaurants/search/geo?lat=${(!test) ? data.coords.latitude : testLat}&lon=${(!test) ? data.coords.longitude : testLon}&distance=500`, {
            headers: { 'X-API-KEY': '508ab21d1d779c46f1ac0e70d12df02e' }
          });

          if (getResto.data && getResto.data.data.length) {
            setLocationResto(getResto.data.data);
          } else {
            setLocationResto(false);
          }
        })();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [test]);


  const handleIndividual = (id) => {
    history.push(`/details/${id}`);
  }

  const renderRestos = (data) => {
    if (data) {
      return (
        <Row>
          {data.map((value) => (
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
      )
    }
  }

  const handleSearch = () => {
    history.push(`/search/${inputRef.current.value}`);
  }

  return (
    <>
      <h1>Restaurants near you</h1>
      {locationResto ? null : "No restaurants are available in your location, "}
      {!locationResto && <Button onClick={() => setTest(true)}>No restaurants ?, Use test location to see restos</Button>}

      <br />
      <input placeholder="Search" ref={inputRef} />
      <Button onClick={handleSearch}>Search</Button>
      {renderRestos(locationResto)}
    </>
  )
}

export default HomePage;