// import React from 'react';
// import { TrendingUp, Calendar, Droplets, Thermometer, AlertTriangle, CheckCircle, Info } from 'lucide-react';
// import { CropData, WeatherData } from '../types';
// import GrowthChart from './GrowthChart';

// interface DashboardProps {
//   cropData: CropData[];
//   seedingDate: string;
//   weather: WeatherData | null;
// }

// const Dashboard: React.FC<DashboardProps> = ({ cropData, seedingDate, weather }) => {
//   const latestData = cropData[cropData.length - 1];
//   const daysAfterSeeding = seedingDate ? 
//     Math.floor((new Date().getTime() - new Date(seedingDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;

//   const getGrowthStatusIcon = (status: string) => {
//     switch (status) {
//       case 'healthy':
//         return <CheckCircle className="h-5 w-5 text-green-500" />;
//       case 'slow':
//         return <Info className="h-5 w-5 text-yellow-500" />;
//       case 'stunted':
//         return <AlertTriangle className="h-5 w-5 text-red-500" />;
//       default:
//         return <Info className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   const getGrowthMessage = (status: string, stage: string) => {
//     switch (status) {
//       case 'healthy':
//         return `Your paddy crop is thriving! It's at the ${stage} stage and growing as expected. Keep up the good work!`;
//       case 'slow':
//         return `Your crop is growing but could be better. The ${stage} stage might need more attention to nutrients or water management.`;
//       case 'stunted':
//         return `Your crop growth is concerning at the ${stage} stage. Consider checking soil health, water levels, and possible pest issues.`;
//       default:
//         return 'Upload more photos to get detailed growth analysis.';
//     }
//   };

//   const getStageAdvice = (stage: string) => {
//     const advice = {
//       'seedling': 'Keep soil moist but not waterlogged. Protect young plants from strong winds.',
//       'tillering': 'Apply nitrogen fertilizer. Maintain water level at 2-3 cm depth.',
//       'stem-elongation': 'Increase water depth to 5-7 cm. Watch for pest activity.',
//       'panicle-initiation': 'Reduce nitrogen, increase potassium. Maintain consistent water levels.',
//       'flowering': 'Keep fields flooded. Avoid pesticide application during flowering.',
//       'grain-filling': 'Maintain adequate water. Apply phosphorus for better grain quality.',
//       'maturity': 'Prepare for harvest. Drain fields 1-2 weeks before harvesting.'
//     };
//     return advice[stage as keyof typeof advice] || 'Continue monitoring your crop regularly.';
//   };

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg text-white p-6">
//         <h2 className="text-2xl font-bold mb-2">Welcome to Your Paddy Farm</h2>
//         <p className="text-green-100 mb-4">
//           {seedingDate ? `Growing for ${daysAfterSeeding} days since ${new Date(seedingDate).toLocaleDateString()}` : 'Set your seeding date to start tracking'}
//         </p>
//         {latestData && (
//           <div className="flex items-center space-x-2">
//             {getGrowthStatusIcon(latestData.healthStatus)}
//             <span className="font-medium capitalize">{latestData.growthStage.replace('-', ' ')} Stage</span>
//           </div>
//         )}
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Current Height</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {latestData ? `${latestData.height} cm` : '--'}
//               </p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-green-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Leaf Coverage</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {latestData ? `${latestData.leafArea} cm²` : '--'}
//               </p>
//             </div>
//             <Calendar className="h-8 w-8 text-blue-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Temperature</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {weather ? `${weather.temperature}°C` : '--'}
//               </p>
//             </div>
//             <Thermometer className="h-8 w-8 text-orange-500" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Humidity</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {weather ? `${weather.humidity}%` : '--'}
//               </p>
//             </div>
//             <Droplets className="h-8 w-8 text-blue-400" />
//           </div>
//         </div>
//       </div>

//       {/* Growth Status */}
//       {latestData && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
//             {getGrowthStatusIcon(latestData.healthStatus)}
//             <span>Growth Status</span>
//           </h3>
//           <div className="space-y-4">
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-gray-800 leading-relaxed">
//                 {getGrowthMessage(latestData.healthStatus, latestData.growthStage)}
//               </p>
//             </div>
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h4 className="font-medium text-blue-900 mb-2">Stage-Specific Advice:</h4>
//               <p className="text-blue-800 text-sm">
//                 {getStageAdvice(latestData.growthStage)}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Growth Chart */}
//       {cropData.length > 1 && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4">Growth Progress</h3>
//           <GrowthChart data={cropData} />
//         </div>
//       )}

//       {/* Recent Photos */}
//       {cropData.length > 0 && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4">Recent Photos</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {cropData.slice(-4).map((data) => (
//               <div key={data.id} className="relative">
//                 <img
//                   src={data.imageUrl}
//                   alt={`Crop on ${data.date}`}
//                   className="w-full h-32 object-cover rounded-lg shadow-sm"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
//                   <p>{new Date(data.date).toLocaleDateString()}</p>
//                   <p>{data.height}cm • {data.growthStage}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Getting Started */}
//       {cropData.length === 0 && (
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <div className="max-w-md mx-auto">
//             <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Monitoring Your Crop</h3>
//             <p className="text-gray-600 mb-6">
//               Upload your first paddy photo and set your seeding date to begin tracking growth progress.
//             </p>
//             <div className="space-y-2 text-sm text-gray-500">
//               <p>✓ Take clear photos of your paddy plants</p>
//               <p>✓ Upload regularly to track progress</p>
//               <p>✓ Get AI-powered growth analysis</p>
//               <p>✓ Receive actionable farming advice</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState } from "react";
// import {
//   Calendar,
//   AlertTriangle,
//   CheckCircle,
//   Info,
// } from "lucide-react";
// import { CropData, WeatherData, ForecastDay } from "../types";
// import GrowthChart from "./GrowthChart";
// import WeatherAdvice from "./WeatherAdvice";

// interface DashboardProps {
//   paddyData?: CropData[];
//   ragiData?: CropData[];
//   wheatData?: CropData[];
//   seedingDates?: { paddy?: string; ragi?: string; wheat?: string };
//   weather?: {
//     paddy?: WeatherData | null;
//     ragi?: WeatherData | null;
//     wheat?: WeatherData | null;
//   };
//   forecast?: {
//     paddy?: ForecastDay[];
//     ragi?: ForecastDay[];
//     wheat?: ForecastDay[];
//   };
// }

// const Dashboard: React.FC<DashboardProps> = ({
//   paddyData = [],
//   ragiData = [],
//   wheatData = [],
//   seedingDates = { paddy: "", ragi: "", wheat: "" },
//   weather = { paddy: null, ragi: null, wheat: null },
//   forecast = { paddy: [], ragi: [], wheat: [] },
// }) => {
//   const [selectedCrop, setSelectedCrop] = useState<"paddy" | "ragi" | "wheat">(
//     "paddy"
//   );

//   // Select crop-specific data safely
//   const cropData =
//     selectedCrop === "paddy"
//       ? paddyData
//       : selectedCrop === "ragi"
//       ? ragiData
//       : wheatData;

//   const seedingDate =
//     selectedCrop === "paddy"
//       ? seedingDates?.paddy || ""
//       : selectedCrop === "ragi"
//       ? seedingDates?.ragi || ""
//       : seedingDates?.wheat || "";

//   const cropWeather =
//     selectedCrop === "paddy"
//       ? weather?.paddy || null
//       : selectedCrop === "ragi"
//       ? weather?.ragi || null
//       : weather?.wheat || null;

//   const cropForecast =
//     selectedCrop === "paddy"
//       ? forecast?.paddy || []
//       : selectedCrop === "ragi"
//       ? forecast?.ragi || []
//       : forecast?.wheat || [];

//   const latestData = cropData.length > 0 ? cropData[cropData.length - 1] : null;

//   const daysAfterSeeding =
//     seedingDate && seedingDate !== ""
//       ? Math.floor(
//           (new Date().getTime() - new Date(seedingDate).getTime()) /
//             (1000 * 60 * 60 * 24)
//         )
//       : 0;

//   const getGrowthStatusIcon = (status: string) => {
//     switch (status) {
//       case "healthy":
//         return <CheckCircle className="h-5 w-5 text-green-500" />;
//       case "slow":
//         return <Info className="h-5 w-5 text-yellow-500" />;
//       case "stunted":
//         return <AlertTriangle className="h-5 w-5 text-red-500" />;
//       default:
//         return <Info className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   const getGrowthMessage = (status: string, stage: string) => {
//     switch (status) {
//       case "healthy":
//         return `Your ${selectedCrop} crop is thriving! It's at the ${stage} stage and growing as expected.`;
//       case "slow":
//         return `Your ${selectedCrop} crop is growing slowly. Pay attention to nutrients or water.`;
//       case "stunted":
//         return `Your ${selectedCrop} crop looks stunted at the ${stage} stage. Check soil, water, and pests.`;
//       default:
//         return "Upload more photos to get detailed growth analysis.";
//     }
//   };

//   const getStageAdvice = (stage: string) => {
//     const advice: Record<string, string> = {
//       seedling:
//         "Keep soil moist but not waterlogged. Protect young plants from strong winds.",
//       tillering: "Apply nitrogen fertilizer. Maintain water level at 2-3 cm depth.",
//       "stem-elongation": "Increase water depth to 5-7 cm. Watch for pest activity.",
//       "panicle-initiation":
//         "Reduce nitrogen, increase potassium. Maintain consistent water levels.",
//       flowering: "Keep fields flooded. Avoid pesticide application during flowering.",
//       "grain-filling":
//         "Maintain adequate water. Apply phosphorus for better grain quality.",
//       maturity: "Prepare for harvest. Drain fields 1-2 weeks before harvesting.",
//     };
//     return advice[stage] || "Continue monitoring your crop regularly.";
//   };

//   return (
//     <div className="space-y-6">
//       {/* Crop Selector */}
//       <div className="flex space-x-4 mb-6">
//         {["paddy", "ragi", "wheat"].map((crop) => (
//           <button
//             key={crop}
//             onClick={() => setSelectedCrop(crop as "paddy" | "ragi" | "wheat")}
//             className={`px-4 py-2 rounded-lg font-medium shadow-md ${
//               selectedCrop === crop
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {crop.charAt(0).toUpperCase() + crop.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg text-white p-6">
//         <h2 className="text-2xl font-bold mb-2">
//           Welcome to Your {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} Farm
//         </h2>
//         <p className="text-green-100 mb-4">
//           {seedingDate
//             ? `Growing for ${daysAfterSeeding} days since ${new Date(
//                 seedingDate
//               ).toLocaleDateString()}`
//             : "Set your seeding date to start tracking"}
//         </p>
//         {latestData && (
//           <div className="flex items-center space-x-2">
//             {getGrowthStatusIcon(latestData.healthStatus)}
//             <span className="font-medium capitalize">
//               {latestData.growthStage.replace("-", " ")} Stage
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Key Metrics */}
//       {latestData && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
//             <p className="text-sm text-gray-600">Current Height</p>
//             <p className="text-2xl font-bold">{latestData.height} cm</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
//             <p className="text-sm text-gray-600">Leaf Coverage</p>
//             <p className="text-2xl font-bold">{latestData.leafArea} cm²</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
//             <p className="text-sm text-gray-600">Temperature</p>
//             <p className="text-2xl font-bold">
//               {cropWeather ? `${cropWeather.temperature}°C` : "--"}
//             </p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
//             <p className="text-sm text-gray-600">Humidity</p>
//             <p className="text-2xl font-bold">
//               {cropWeather ? `${cropWeather.humidity}%` : "--"}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Growth Status */}
//       {latestData && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
//             {getGrowthStatusIcon(latestData.healthStatus)}
//             <span>Growth Status</span>
//           </h3>
//           <p>{getGrowthMessage(latestData.healthStatus, latestData.growthStage)}</p>
//           <p className="mt-2 text-sm text-blue-800">
//             {getStageAdvice(latestData.growthStage)}
//           </p>
//         </div>
//       )}

//       {/* Growth Chart */}
//       {cropData.length > 1 && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4">Growth Progress</h3>
//           <GrowthChart data={cropData} />
//         </div>
//       )}

//       {/* Recent Photos */}
//       {cropData.length > 0 && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4">Recent Photos</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {cropData.slice(-4).map((data) => (
//               <div key={data.id}>
//                 <img
//                   src={data.imageUrl}
//                   alt={`Crop on ${data.date}`}
//                   className="w-full h-32 object-cover rounded-lg"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Weather Advice */}
//       <WeatherAdvice
//         weather={cropWeather}
//         cropData={cropData}
//         forecast={cropForecast}
//         selectedCrop={selectedCrop}
//       />

//       {/* Getting Started */}
//       {cropData.length === 0 && (
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold">Start Monitoring Your Crop</h3>
//           <p className="text-gray-600">
//             Upload your first {selectedCrop} photo and set your seeding date to begin.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Calendar, AlertTriangle, CheckCircle, Info, TrendingUp, Leaf, Thermometer, Droplets, Sun, Cloud, CloudRain, Zap } from "lucide-react";
import { CropData, WeatherData, ForecastDay } from "../types";
import GrowthChart from "./GrowthChart";
import WeatherAdvice from "./WeatherAdvice";
import { growthStandards } from './GrowthAnalysis'; // Import growth standards

interface DashboardProps {
  paddyData: CropData[];
  ragiData: CropData[];
  wheatData: CropData[];
  seedingDates?: { paddy?: string; ragi?: string; wheat?: string };
  weather?: {
    paddy?: WeatherData | null;
    ragi?: WeatherData | null;
    wheat?: WeatherData | null;
  };
  forecast?: {
    paddy?: ForecastDay[];
    ragi?: ForecastDay[];
    wheat?: ForecastDay[];
  };
  selectedCrop: "paddy" | "ragi" | "wheat";
}

const Dashboard: React.FC<DashboardProps> = ({
  paddyData = [],
  ragiData = [],
  wheatData = [],
  seedingDates,
  weather,
  forecast,
  selectedCrop,
}) => {
  // Crop-specific data
  const cropData =
    selectedCrop === "paddy" ? paddyData : selectedCrop === "ragi" ? ragiData : wheatData;

  const seedingDate =
    selectedCrop === "paddy"
      ? seedingDates?.paddy || ""
      : selectedCrop === "ragi"
      ? seedingDates?.ragi || ""
      : seedingDates?.wheat || "";

  const cropWeather =
    selectedCrop === "paddy"
      ? weather?.paddy || null
      : selectedCrop === "ragi"
      ? weather?.ragi || null
      : weather?.wheat || null;

  const cropForecast =
    selectedCrop === "paddy"
      ? forecast?.paddy || []
      : selectedCrop === "ragi"
      ? forecast?.ragi || []
      : forecast?.wheat || [];

  const latestData = cropData.length > 0 ? cropData[cropData.length - 1] : null;

  const daysAfterSeeding =
    seedingDate && seedingDate !== ""
      ? Math.floor(
          (new Date().getTime() - new Date(seedingDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const getGrowthStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "slow":
        return <Info className="h-5 w-5 text-yellow-500" />;
      case "stunted":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getGrowthMessage = (status: string, stage: string) => {
    switch (status) {
      case "healthy":
        return `Your ${selectedCrop} crop is thriving! It's at the ${stage} stage and growing as expected.`;
      case "slow":
        return `Your ${selectedCrop} crop is growing slowly. Pay attention to nutrients or water.`;
      case "stunted":
        return `Your ${selectedCrop} crop looks stunted at the ${stage} stage. Check soil, water, and pests.`;
      default:
        return "Upload more photos to get detailed growth analysis.";
    }
  };

  const getStageAdvice = (stage: string) => {
    const advice: Record<string, string> = {
      seedling:
        "Keep soil moist but not waterlogged. Protect young plants from strong winds.",
      tillering: "Apply nitrogen fertilizer. Maintain water level at 2-3 cm depth.",
      "stem-elongation": "Increase water depth to 5-7 cm. Watch for pest activity.",
      "panicle-initiation":
        "Reduce nitrogen, increase potassium. Maintain consistent water levels.",
      flowering: "Keep fields flooded. Avoid pesticide application during flowering.",
      "grain-filling":
        "Maintain adequate water. Apply phosphorus for better grain quality.",
      maturity: "Prepare for harvest. Drain fields 1-2 weeks before harvesting.",
    };
    return advice[stage] || "Continue monitoring your crop regularly.";
  };

  const getNextStageInfo = (currentStage: string, days: number) => {
    const stageKeys = Object.keys(growthStandards);
    const currentIndex = stageKeys.indexOf(currentStage);

    if (currentIndex === -1 || currentIndex === stageKeys.length - 1) {
      return { nextStage: 'Harvest Ready', daysToNext: 0 };
    }

    const nextStageKey = stageKeys[currentIndex + 1];
    const nextStage = growthStandards[nextStageKey];
    const daysToNext = Math.max(0, nextStage.daysRange.min - days);

    return { nextStage: nextStageKey.replace('-', ' '), daysToNext };
  };

  const getWeatherIcon = (forecast: string | undefined) => {
    if (!forecast) return <Info className="h-6 w-6 text-gray-400" />;
    if (forecast.includes('rain')) return <CloudRain className="h-6 w-6 text-blue-400" />;
    if (forecast.includes('cloud')) return <Cloud className="h-6 w-6 text-gray-400" />;
    return <Sun className="h-6 w-6 text-yellow-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg text-white p-6">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to Your {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} Farm
        </h2>
        <p className="text-green-100 mb-4">
          {seedingDate
            ? `Growing for ${daysAfterSeeding} days since ${new Date(
                seedingDate
              ).toLocaleDateString()}`
            : "Set your seeding date to start tracking"}
        </p>
        {latestData && (
          <div className="flex items-center space-x-2">
            {getGrowthStatusIcon(latestData.healthStatus)}
            <span className="font-medium capitalize">
              {latestData.growthStage.replace("-", " ")} Stage
            </span>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      {latestData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Current Height */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Height</p>
                <p className="text-2xl font-bold text-gray-900">{latestData.height} cm</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          {/* Leaf Coverage */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Leaf Coverage</p>
                <p className="text-2xl font-bold text-gray-900">{latestData.leafArea} cm²</p>
              </div>
              <Leaf className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          {/* Temperature */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cropWeather ? `${cropWeather.temperature}°C` : "--"}
                </p>
              </div>
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          {/* Humidity */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-gray-900">{cropWeather ? `${cropWeather.humidity}%` : "--"}</p>
              </div>
              <Droplets className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>
      )}

      {/* Growth Status */}
      {latestData && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            {getGrowthStatusIcon(latestData.healthStatus)}
            <span>Growth Status</span>
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">
                {getGrowthMessage(latestData.healthStatus, latestData.growthStage)}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Stage-Specific Advice:</h4>
              <p className="text-blue-800 text-sm">{getStageAdvice(latestData.growthStage)}</p>
            </div>
          </div>
        </div>
      )}

      {/* New Section: Forecast and Next Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 5-Day Forecast */}
        {cropForecast.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
            <div className="flex justify-between space-x-2">
              {cropForecast.slice(0, 5).map((day, index) => (
                <div key={index} className="flex-1 text-center bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-sm text-gray-700">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                  <div className="my-2 flex justify-center">{getWeatherIcon(day.forecast)}</div>
                  <p className="text-lg font-bold text-gray-900">{day.temperature}°C</p>
                  <p className="text-xs text-gray-500">{day.humidity}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Stage Countdown */}
        {latestData && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Next Growth Stage</h3>
            <div className="flex items-center justify-center text-center bg-purple-50 p-4 rounded-lg">
              <div>
                <p className="text-4xl font-bold text-purple-600">{getNextStageInfo(latestData.growthStage, latestData.daysAfterSeeding).daysToNext}</p>
                <p className="text-sm font-medium text-purple-800">days until</p>
                <p className="text-lg font-semibold text-purple-900 capitalize">{getNextStageInfo(latestData.growthStage, latestData.daysAfterSeeding).nextStage}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Growth Chart */}
      {cropData.length > 1 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Growth Progress</h3>
          <GrowthChart data={cropData} />
        </div>
      )}

      {/* Weather Advice */}
      <WeatherAdvice
        weather={cropWeather}
        cropData={cropData}
        forecast={cropForecast}
        selectedCrop={selectedCrop}
      />

      {/* Getting Started */}
      {cropData.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="max-w-md mx-auto">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Monitoring Your Crop</h3>
            <p className="text-gray-600 mb-6">
              Upload your first {selectedCrop} photo and set your seeding date to begin tracking growth progress.
            </p>
            <div className="space-y-2 text-sm text-gray-500 text-left">
              <p>✓ Take clear photos of your plants</p>
              <p>✓ Upload regularly to track progress</p>
              <p>✓ Get AI-powered growth analysis</p>
              <p>✓ Receive actionable farming advice</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
