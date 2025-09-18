import React, { useState } from "react";
import LocationPicker from "./LocationPicker"; // import your LocationPicker

const MapWrapper: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleChooseClick = () => {
    setShowMap(true);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    console.log("Selected Location:", lat, lng);
    // If you want the map to close after selecting a location, uncomment:
    // setShowMap(false);
  };

  return (
    <div>
      <button onClick={handleChooseClick}>Choose</button>

      {showMap && (
        <div style={{ marginTop: "20px" }}>
          <LocationPicker onLocationSelect={handleLocationSelect} />
        </div>
      )}

      {selectedLocation && (
        <p>
          ✅ Selected Location: {selectedLocation.lat}, {selectedLocation.lng}
        </p>
      )}
    </div>
  );
};

export default MapWrapper;
