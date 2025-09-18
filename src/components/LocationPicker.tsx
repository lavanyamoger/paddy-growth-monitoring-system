// import React from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// interface LocationPickerProps {
//   onLocationSelect: (lat: number, lon: number) => void;
//   initialPosition?: { lat: number; lon: number };
// }

// const LocationMarker: React.FC<{ onSelect: (lat: number, lon: number) => void; position: { lat: number; lon: number } | null }> = ({ onSelect, position }) => {
//   useMapEvents({
//     click(e) {
//       onSelect(e.latlng.lat, e.latlng.lng);
//     },
//   });
//   return position ? <Marker position={[position.lat, position.lon]} /> : null;
// };

// const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialPosition }) => {
//   const [position, setPosition] = React.useState<{ lat: number; lon: number } | null>(initialPosition || null);

//   const handleSelect = (lat: number, lon: number) => {
//     setPosition({ lat, lon });
//     onLocationSelect(lat, lon);
//   };

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//       <MapContainer center={position ? [position.lat, position.lon] : [15.3173, 75.7139]} zoom={7} style={{ height: '100%', width: '100%' }}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocationMarker onSelect={handleSelect} position={position} />
//       </MapContainer>
//     </div>
//   );
// };

// export default LocationPicker; 



import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";

// ✅ Fix marker icons for Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, name: string) => void;
}

interface Position {
  lat: number;
  lng: number;
  name: string;
  weather?: WeatherData | null;
}

interface WeatherData {
  temp: number;
  humidity: number | null;
  rainfall: number | null;
  suitable: string;
}

const LocationMarker: React.FC<{
  onSelect: (lat: number, lng: number, name: string, weather: WeatherData) => void;
  position: Position | null;
}> = ({ onSelect, position }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      try {
        // ✅ Reverse geocoding using OpenStreetMap
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        const placeName = data.display_name || "Unknown Place";

        // ✅ Fetch weather (OpenWeatherMap API)
        const weatherKey = "YOUR_API_KEY"; // 🔑 replace with your API key
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${weatherKey}`
        );
        const weatherData = await weatherRes.json();

        const temp = weatherData.main?.temp ?? 0;
        const humidity = weatherData.main?.humidity ?? null;
        const rainfall =
          weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? null;

        // ✅ Simple suitability logic for paddy
        let suitable = "Not Suitable";
        if (temp >= 20 && temp <= 35 && humidity && humidity > 60) {
          suitable = "✅ Suitable for Paddy";
        } else {
          suitable = "❌ Not Suitable for Paddy";
        }

        const weather: WeatherData = { temp, humidity, rainfall, suitable };
        onSelect(lat, lng, placeName, weather);
      } catch (error) {
        console.error("Error fetching data:", error);
        onSelect(lat, lng, "Unknown Place", {
          temp: 0,
          humidity: null,
          rainfall: null,
          suitable: "❌ Weather data unavailable",
        });
      }
    },
  });

  return position ? (
    <Marker position={[position.lat, position.lng]}>
      <Popup>
        <strong>📍 {position.name}</strong> <br />
        🌡 Temp: {position.weather?.temp}°C <br />
        💧 Humidity:{" "}
        {position.weather?.humidity !== null
          ? `${position.weather?.humidity}%`
          : "N/A"}{" "}
        <br />
        🌧 Rainfall:{" "}
        {position.weather?.rainfall !== null
          ? `${position.weather?.rainfall} mm`
          : "N/A"}{" "}
        <br />
        🌱 {position.weather?.suitable}
      </Popup>
    </Marker>
  ) : null;
};

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<Position | null>(null);

  const handleSelect = (
    lat: number,
    lng: number,
    name: string,
    weather: WeatherData
  ) => {
    setPosition({ lat, lng, name, weather });
    onLocationSelect(lat, lng, name);
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[15.3173, 75.7139]} // Default: Karnataka
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelect={handleSelect} position={position} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
