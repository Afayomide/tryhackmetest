import { useState, type ChangeEvent } from "react";
import { API_URL } from "../app";
import { Link } from "react-router-dom";

type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};
type Cities = {
  city: string;
  country: string;
};

const fetchAndFilterHotels = async (value: string) => {
  const response = await fetch(
    `${API_URL}/search?search=${encodeURIComponent(value)}`
  );
  const data = await response.json();
  console.log(data);

  return {
    hotels: data.hotels,
    cities: data.categorized.cities,
    countries: data.categorized.countries,
  };
};

function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cities, setCities] = useState<Cities[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [hide, setHide] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setHotels([]);
      setShowClearBtn(false);
      return;
    }
    setHide(false);

    const filteredHotels = await fetchAndFilterHotels(event.target.value);
    setShowClearBtn(true);
    setHotels(filteredHotels.hotels);
    setCities(filteredHotels.cities);
    setCountries(filteredHotels.countries);
  };

  const fetchCityCountry = async (type: string, value: string) => {
    const response = await fetch(
      `${API_URL}/search/${type}?search=${encodeURIComponent(value)}`
    );
    const data = await response.json();
    console.log(data);
    setHotels(data.hotels);
    setHide(true);
  };

  return (
    <div className="dropdown">
      <div className="form">
        <i className="fa fa-search"></i>
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search accommodation..."
          onChange={fetchData}
        />
        {showClearBtn && (
          <span className="left-pan">
            <i className="fa fa-close"></i>
          </span>
        )}
      </div>
      {!!hotels.length && (
        <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
          <h2>Hotels</h2>
          {hotels.length ? (
            hotels.map((hotel, index) => (
              <li key={index}>
                <Link to={`/hotels/${hotel._id}`} className="dropdown-item">
                  <i className="fa fa-building mr-2"></i>
                  {hotel.hotel_name}
                </Link>
                <hr className="divider" />
              </li>
            ))
          ) : (
            <p>No hotels matched</p>
          )}
          {!hide && (
            <>
              <h2>Countries</h2>
              <p>
                {countries.length ? (
                  countries.map((country, index) => (
                    <li key={index}>
                      <p
                        onClick={() => fetchCityCountry("country", country)}
                        className="dropdown-item"
                      >
                        <i className="fa fa-map-pin mr-2"></i>
                        {country}
                      </p>
                      <hr className="divider" />
                    </li>
                  ))
                ) : (
                  <p>No country found</p>
                )}
              </p>

              <h2>Cities</h2>
              <p>
                {cities.length ? (
                  cities.map((city, index) => (
                    <li key={index}>
                      <p
                        onClick={() => fetchCityCountry("city", city.city)}
                        className="dropdown-item"
                      >
                        <i className="fa fa-taxi mr-2"></i>
                        {city.city}, {city.country}
                      </p>
                      <hr className="divider" />
                    </li>
                  ))
                ) : (
                  <p>No city found</p>
                )}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
