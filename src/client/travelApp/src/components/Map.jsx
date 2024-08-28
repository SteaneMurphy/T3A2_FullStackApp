import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TravelMap = ({ locations }) => {
  // Default center should be adjusted based on your requirements
  const defaultCenter = [40.7128, -74.0060]; // Center around New York City as an example
  const center = locations.length > 0 
    ? [locations[0].lat, locations[0].lng] 
    : defaultCenter;

  return (
    <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup>
            <h3>{location.name}</h3>
            <p>{location.description}</p>
          </Popup>
        </Marker>
      ))}
      <Polyline positions={locations.map(({ lat, lng }) => [lat, lng])} color="blue" />
    </MapContainer>
  );
};

export default TravelMap;
