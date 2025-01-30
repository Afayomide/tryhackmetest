import { useState, useEffect } from "react";
import { API_URL } from "../app";
import { useParams } from "react-router-dom";
import { Hotel } from "./types";


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
  return <div>{result ? <div className="text-white">
    <h2><span className="text-dark">Hotel Name: </span>{result.hotel_name}</h2>
    <p><span className="text-dark"> Country: </span>{result.country}</p>
    <p><span className="text-dark">City: </span>{result.city}</p>
  </div> : "Loading..."}</div>;
}
