import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Individual = () => {
  const [locationResto, setLocationResto] = useState(null);

  const params = useParams();

  useEffect(() => {
    (async () => {
      const getResto = await axios.get(`https://api.documenu.com/v2/restaurant/${params.id}`, {
        headers: { 'X-API-KEY': '508ab21d1d779c46f1ac0e70d12df02e' }
      });

      if (getResto.data) {
        setLocationResto(getResto.data.result);
      } else {
        setLocationResto(false);
      }
    })();
  }, []);

  return (
    <div>
      {(locationResto) ? (
        <div>
          <h1>{locationResto.restaurant_name}</h1>
          <h3>Address: {locationResto.address.formatted}</h3>
          <h5>Phone: {locationResto.restaurant_phone}</h5>
          <p>Cuisines: {locationResto.cuisines.map((value) => (<span>{value}, </span>))}</p>

          <h3>Menu</h3>
          {locationResto.menus[0].menu_sections.map((value) => (
            <p>
              <strong>{value.section_name}</strong>
              <ul>
              {value.menu_items.map((val) => (
                <li><strong>{val.name}</strong>, <strong>description: </strong>{val.description}, <strong>price: </strong>{val.pricing[0].priceString}</li>
              ))}
              </ul>
            </p>
          ))}
        </div>
      ) : "Loading..."}
    </div>
  )
}

export default Individual;