import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TravelMap = ({ locations }) => {
  const [mapCenter, setMapCenter] = useState([-37.8136, 144.9631]); // Default center
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const updatedMarkers = [];
      for (const location of locations) {
        const address = `${location.destination}, ${location.country}`;
        try {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=YOUR_API_KEY`);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            updatedMarkers.push({ ...location, lat, lng });
          }
        } catch (error) {
          console.error(`Error fetching coordinates for ${address}:`, error);
        }
      }
      setMarkers(updatedMarkers);

      if (updatedMarkers.length > 0) {
        setMapCenter([updatedMarkers[0].lat, updatedMarkers[0].lng]);
      }
    };

    fetchCoordinates();
  }, [locations]);

  return (
    <MapContainer center={mapCenter} zoom={5} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>
            <h3>{marker.name}</h3>
            <p>{marker.description}</p>
          </Popup>
        </Marker>
      ))}
      <Polyline positions={markers.map(({ lat, lng }) => [lat, lng])} color="blue" />
    </MapContainer>
  );
};

export default TravelMap;
