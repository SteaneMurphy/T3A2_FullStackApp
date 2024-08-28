//modules
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const TravelMap = ({ locations }) => {

  //default center is NY
  const defaultCenter = [40.7128, -74.0060];

  //centers the map around the first destination in the itinerary
  //else use default center point
  const center = locations.length > 0 ? 
    [locations[0].latitude, locations[0].longitude] 
    : defaultCenter;

  return (
    <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {/* For each destination, put a marker on the map using the long/lat properties */}
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            <h3>{location.name}</h3>
            <p>{location.description}</p>
          </Popup>
        </Marker>
      ))}
      {/* For each destination draw a line between each marker */}
      <Polyline positions={locations.map(location => [location.latitude, location.longitude])} color="blue" />
    </MapContainer>
  );
};

export default TravelMap;
