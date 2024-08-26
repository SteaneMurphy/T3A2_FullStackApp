import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';

const TravelMap = ({ locations }) => {
    const defaultCenter = [-37.8136, 144.9631];
    const center = locations.length ? [locations[0].lat, locations[0].lng] : defaultCenter;

    return (
        <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map(({ lat, lng, name, description }, index) => (
            <Marker key={index} position={[lat, lng]}>
              <Popup>
                <h3>{name}</h3>
                <p>{description}</p>
              </Popup>
            </Marker>
          ))}
          <Polyline positions={locations.map(({ lat, lng }) => [lat, lng])} color="blue" />
        </MapContainer>
      );
    };
    
    export default TravelMap;