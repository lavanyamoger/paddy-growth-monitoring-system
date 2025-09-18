import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Camera, TrendingUp, CloudRain, Leaf, Info } from "lucide-react";
import Dashboard from "./components/Dashboard";
import ImageUpload from "./components/ImageUpload";
import GrowthAnalysis from "./components/GrowthAnalysis";
import WeatherAdvice from "./components/WeatherAdvice";
import LocationPicker from "./components/LocationPicker";
import CropInfo from "./components/CropInfo";

import { CropData, WeatherData, ForecastDay } from "./types";

// Predefined crop database
const cropDatabase: Record<
  "paddy" | "ragi" | "wheat",
  { crop: string; duration: string; irrigation: string; fertilizer: string }
> = {
  paddy: {
    crop: "Paddy",
    duration: "120 days",
    irrigation: "High water requirement",
    fertilizer: "Nitrogen, Phosphorus, Potassium",
  },
  ragi: {
    crop: "Ragi",
    duration: "100 days",
    irrigation: "Moderate water requirement",
    fertilizer: "Nitrogen, Phosphorus, Potassium",
  },
  wheat: {
    crop: "Wheat",
    duration: "110 days",
    irrigation: "Moderate water requirement",
    fertilizer: "Nitrogen, Phosphorus, Potassium",
  },
};

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // ✅ Multi-crop states
  const [cropData, setCropData] = useState<{
    paddy: CropData[];
    ragi: CropData[];
    wheat: CropData[];
  }>({ paddy: [], ragi: [], wheat: [] });

  const [seedingDates, setSeedingDates] = useState<{
    paddy: string;
    ragi: string;
    wheat: string;
  }>({ paddy: "", ragi: "", wheat: "" });

  const [weather, setWeather] = useState<{
    paddy: WeatherData | null;
    ragi: WeatherData | null;
    wheat: WeatherData | null;
  }>({ paddy: null, ragi: null, wheat: null });

  const [forecast, setForecast] = useState<{
    paddy: ForecastDay[];
    ragi: ForecastDay[];
    wheat: ForecastDay[];
  }>({ paddy: [], ragi: [], wheat: [] });

  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
    place?: string;
  } | null>(null);

  const [showMap, setShowMap] = useState(false);

  // ✅ Selected crop (global for all pages)
  const [selectedCrop, setSelectedCrop] = useState<"paddy" | "ragi" | "wheat">(
    "paddy"
  );

  // ✅ Load data for each crop from localStorage
  useEffect(() => {
    (["paddy", "ragi", "wheat"] as const).forEach((crop) => {
      const savedCropData = localStorage.getItem(`${crop}CropData`);
      const savedSeedingDate = localStorage.getItem(`${crop}SeedingDate`);
      if (savedCropData) {
        setCropData((prev) => ({
          ...prev,
          [crop]: JSON.parse(savedCropData),
        }));
      }
      if (savedSeedingDate) {
        setSeedingDates((prev) => ({
          ...prev,
          [crop]: savedSeedingDate,
        }));
      }
    });
  }, []);

  // ✅ Fetch weather whenever location changes
  useEffect(() => {
    if (location) {
      (["paddy", "ragi", "wheat"] as const).forEach((crop) => {
        fetchWeatherData(location.lat, location.lon, crop);
      });
    }
  }, [location]);

  // ✅ Fetch weather per crop
  const fetchWeatherData = async (
    lat: number,
    lon: number,
    crop: "paddy" | "ragi" | "wheat"
  ) => {
    try {
      const apiKey = "439633b82cc8cd38dbac682f8ab0ee86"; // replace with your API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather");

      const data = await response.json();

      const weatherData: WeatherData = {
        temperature: data.main?.temp ? Math.round(data.main.temp) : null,
        humidity: data.main?.humidity ?? null,
        rainfall: 0,
        windSpeed: data.wind?.speed ? Math.round(data.wind.speed) : null,
        forecast: data.weather?.[0]?.main?.toLowerCase().includes("rain")
          ? "rainy"
          : data.weather?.[0]?.main?.toLowerCase().includes("cloud")
          ? "cloudy"
          : "sunny",
      };

      setWeather((prev) => ({ ...prev, [crop]: weatherData }));
    } catch (error) {
      console.error("Weather fetch error:", error);
      setWeather((prev) => ({ ...prev, [crop]: null }));
    }
  };

  // ✅ Add crop analysis data
  const addCropData = (newData: CropData) => {
    setCropData((prev) => {
      const updated = {
        ...prev,
        [selectedCrop]: [...prev[selectedCrop], newData],
      };
      localStorage.setItem(
        `${selectedCrop}CropData`,
        JSON.stringify(updated[selectedCrop])
      );
      return updated;
    });
  };

  const updateSeedingDate = (date: string) => {
    setSeedingDates((prev) => {
      const updated = { ...prev, [selectedCrop]: date };
      localStorage.setItem(`${selectedCrop}SeedingDate`, date);
      return updated;
    });
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "upload", label: "Upload", icon: Camera },
    { id: "analysis", label: "Analysis", icon: Leaf },
    { id: "weather", label: "Weather", icon: CloudRain },
    { id: "info", label: "Crop Info", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CropWatch</h1>
                <p className="text-sm text-gray-600">Smart Crop Monitoring</p>
              </div>
            </div>

            {/* Middle Section → Crop Buttons */}
            <div className="flex items-center space-x-3">
              {(["paddy", "ragi", "wheat"] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedCrop === crop
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  {cropDatabase[crop].crop}
                </button>
              ))}
            </div>

            {/* Right Section → Photos Analyzed */}
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-green-800">
                  {cropData[selectedCrop].length} Photos Analyzed
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Picker */}
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowMap((v) => !v)}
        >
          {showMap ? "Hide Map" : "Choose Location on Map"}
        </button>

        {showMap && (
          <LocationPicker
            onLocationSelect={(lat, lon, place) => {
              setLocation({ lat, lon, place });
              setShowMap(false);
            }}
            initialPosition={location || { lat: 15.3173, lon: 75.7139 }}
          />
        )}

        {location && (
          <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
            <p>✅ Selected Location:</p>
            <p>
              Latitude: {location.lat}, Longitude: {location.lon}
            </p>
            <p>📍 Place: {location.place || "Unknown"}</p>
          </div>
        )}

        {/* Tabs Content */}
        {activeTab === "dashboard" && (
          <Dashboard
            paddyData={cropData.paddy}
            ragiData={cropData.ragi}
            wheatData={cropData.wheat}
            seedingDates={seedingDates}
            weather={weather}
            forecast={forecast}
            selectedCrop={selectedCrop} // ✅ consistent
          />
        )}
        {activeTab === "upload" && (
          <ImageUpload
            onDataAdd={addCropData}
            seedingDate={seedingDates[selectedCrop]}
            onSeedingDateChange={updateSeedingDate}
            selectedCrop={selectedCrop}
          />
        )}
        {activeTab === "analysis" && (
          <GrowthAnalysis
            cropData={cropData[selectedCrop]}
            seedingDate={seedingDates[selectedCrop]}
            selectedCrop={selectedCrop} // ✅ consistent
          />
        )}
        {activeTab === "weather" && (
          <WeatherAdvice
            weather={weather[selectedCrop]}
            cropData={cropData[selectedCrop]}
            forecast={forecast[selectedCrop]}
            selectedCrop={selectedCrop} // ✅ consistent
          />
        )}
        {activeTab === "info" && (
          <CropInfo cropType={selectedCrop} />
        )}
      </main>
    </div>
  );
}

export default App;
