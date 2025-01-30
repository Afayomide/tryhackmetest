import { useState, useEffect } from "react";
import { API_URL } from "../app";
import { useParams } from "react-router-dom";

type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};

export default function SearchResult() {
  const { id } = useParams();
  const [result, setResult] = useState<Hotel | null>(null);

  const fetchHotel = async () => {
    const hotelsData = await fetch(`${API_URL}/hotel/${id}`);
    const hotel = (await hotelsData.json()) ;
    setResult(hotel);
  };
  useEffect(() => {
    fetchHotel();
  }, [id]);
  return <div>{result ? <div>
    <h2>{result.hotel_name}</h2>
    <p>{result.city}</p>
    <p>{result.country}</p>
  </div> : "Loading..."}</div>;
}
