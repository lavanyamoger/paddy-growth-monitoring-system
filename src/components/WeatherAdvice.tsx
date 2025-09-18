// import React from 'react';
// import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, AlertTriangle, Info, CheckCircle } from 'lucide-react';
// import { WeatherData, CropData } from '../types';

// interface WeatherAdviceProps {
//   weather: WeatherData | null;
//   cropData: CropData[];
// }

// const WeatherAdvice: React.FC<WeatherAdviceProps> = ({ weather, cropData }) => {
//   const latestCrop = cropData[cropData.length - 1];

//   const getWeatherIcon = (forecast: string) => {
//     switch (forecast) {
//       case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
//       case 'rainy': return <CloudRain className="h-8 w-8 text-blue-500" />;
//       case 'cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
//       default: return <Sun className="h-8 w-8 text-yellow-500" />;
//     }
//   };

//   const getTemperatureAdvice = (temp: number, stage: string) => {
//     const advice = [];
    
//     if (temp > 35) {
//       advice.push({
//         type: 'warning',
//         title: 'High Temperature Alert',
//         message: 'Extremely hot weather can stress your paddy plants and increase water evaporation.',
//         actions: [
//           'Increase irrigation frequency - check water levels twice daily',
//           'Maintain deeper water levels (7-10 cm) to cool roots',
//           'Consider light mulching between rows if accessible',
//           'Monitor for heat stress signs like leaf curling'
//         ]
//       });
//     } else if (temp > 30) {
//       advice.push({
//         type: 'info',
//         title: 'Warm Weather Management',
//         message: 'Warm temperatures are generally good for paddy growth but require careful water management.',
//         actions: [
//           'Maintain consistent water levels to prevent stress',
//           'Check irrigation systems for proper function',
//           'Early morning or evening field visits recommended'
//         ]
//       });
//     } else if (temp < 20) {
//       advice.push({
//         type: 'warning',
//         title: 'Cool Temperature Notice',
//         message: 'Cooler temperatures may slow down growth, especially during early stages.',
//         actions: [
//           'Reduce water depth slightly to allow soil warming',
//           'Growth may be slower - adjust expectations accordingly',
//           'Protect young plants from cold winds if possible'
//         ]
//       });
//     } else {
//       advice.push({
//         type: 'success',
//         title: 'Optimal Temperature',
//         message: 'Current temperatures are ideal for healthy paddy growth.',
//         actions: [
//           'Continue regular monitoring and care routine',
//           'Maintain current irrigation schedule',
//           'Good conditions for applying fertilizers if needed'
//         ]
//       });
//     }

//     return advice;
//   };

//   const getHumidityAdvice = (humidity: number, stage: string) => {
//     const advice = [];
    
//     if (humidity > 85) {
//       advice.push({
//         type: 'warning',
//         title: 'High Humidity Alert',
//         message: 'Very high humidity increases risk of fungal diseases and pest problems.',
//         actions: [
//           'Improve air circulation - avoid overcrowding if transplanted',
//           'Monitor closely for signs of blast disease or brown spot',
//           'Reduce nitrogen fertilizer temporarily to avoid lush growth',
//           'Consider fungicide application if disease symptoms appear'
//         ]
//       });
//     } else if (humidity < 50) {
//       advice.push({
//         type: 'info',
//         title: 'Low Humidity Conditions',
//         message: 'Lower humidity means faster water evaporation from your fields.',
//         actions: [
//           'Increase irrigation frequency to compensate for faster evaporation',
//           'Check water levels more frequently',
//           'Consider evening watering to reduce evaporation losses'
//         ]
//       });
//     } else {
//       advice.push({
//         type: 'success',
//         title: 'Good Humidity Levels',
//         message: 'Humidity levels are favorable for paddy cultivation.',
//         actions: [
//           'Continue normal irrigation practices',
//           'Regular disease monitoring as usual',
//           'Good conditions for most farming activities'
//         ]
//       });
//     }

//     return advice;
//   };

//   const getRainfallAdvice = (rainfall: number, forecast: string, stage: string) => {
//     const advice = [];
    
//     if (forecast === 'rainy' || rainfall > 10) {
//       advice.push({
//         type: 'info',
//         title: 'Rainfall Expected',
//         message: 'Natural rainfall can supplement your irrigation but requires field management.',
//         actions: [
//           'Check drainage systems to prevent waterlogging',
//           'Reduce or skip planned irrigation for 1-2 days',
//           'Monitor field borders for water overflow',
//           'Good time for applying organic fertilizers after rain stops',
//           'Avoid field activities during heavy rain to prevent soil compaction'
//         ]
//       });
//     } else if (forecast === 'sunny' && rainfall === 0) {
//       advice.push({
//         type: 'warning',
//         title: 'No Rain Expected',
//         message: 'Clear skies mean you\'ll need to rely entirely on irrigation.',
//         actions: [
//           'Ensure irrigation systems are functioning properly',
//           'Plan regular watering schedule - every 2-3 days minimum',
//           'Check water source availability and backup options',
//           'Monitor soil moisture levels more closely'
//         ]
//       });
//     }

//     return advice;
//   };

//   const getStageSpecificWeatherAdvice = (stage: string, weather: WeatherData) => {
//     const stageAdvice: { [key: string]: string[] } = {
//       'seedling': [
//         'Young plants are sensitive to weather changes',
//         'Maintain shallow water levels (1-2 cm) regardless of rain',
//         'Protect from strong winds and heavy rain damage'
//       ],
//       'tillering': [
//         'This stage benefits from consistent water and warm temperatures',
//         'Good time for fertilizer application before expected rain',
//         'Monitor for pest activity in humid conditions'
//       ],
//       'stem-elongation': [
//         'Plants need more water during rapid growth phase',
//         'Hot weather increases nutrient uptake - good for growth',
//         'Ensure adequate water depth (5-7 cm) during hot spells'
//       ],
//       'panicle-initiation': [
//         'Critical stage - avoid water stress during hot weather',
//         'Consistent water levels crucial for proper panicle formation',
//         'Cool evenings beneficial for flower development'
//       ],
//       'flowering': [
//         'Extremely sensitive to water stress and temperature extremes',
//         'Avoid field drainage even if heavy rain expected',
//         'High humidity can affect pollination - monitor closely'
//       ],
//       'grain-filling': [
//         'Steady water supply needed for grain development',
//         'Hot weather can accelerate grain filling - monitor maturity',
//         'Reduce water gradually if preparing for harvest'
//       ],
//       'maturity': [
//         'Begin field drainage if no rain expected for several days',
//         'Avoid heavy rain damage to mature grains',
//         'Plan harvest timing based on weather forecasts'
//       ]
//     };

//     return stageAdvice[stage] || ['Monitor weather conditions regularly', 'Adjust care practices based on conditions'];
//   };

//   if (!weather) {
//     return (
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Weather Data Loading...</h2>
//           <p className="text-gray-600">
//             Please wait while we fetch current weather information for your area.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const temperatureAdvice = getTemperatureAdvice(weather.temperature, latestCrop?.growthStage || 'seedling');
//   const humidityAdvice = getHumidityAdvice(weather.humidity, latestCrop?.growthStage || 'seedling');
//   const rainfallAdvice = getRainfallAdvice(weather.rainfall, weather.forecast, latestCrop?.growthStage || 'seedling');
//   const stageSpecificAdvice = getStageSpecificWeatherAdvice(latestCrop?.growthStage || 'seedling', weather);

//   const allAdvice = [...temperatureAdvice, ...humidityAdvice, ...rainfallAdvice];

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Current Weather Overview */}
//       <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6">
//         <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
//           {getWeatherIcon(weather.forecast)}
//           <span>Today's Weather Conditions</span>
//         </h2>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Thermometer className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Temperature</p>
//             <p className="text-2xl font-bold">{weather.temperature}°C</p>
//           </div>
          
//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Droplets className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Humidity</p>
//             <p className="text-2xl font-bold">{weather.humidity}%</p>
//           </div>
          
//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <CloudRain className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Rainfall</p>
//             <p className="text-2xl font-bold">{weather.rainfall}mm</p>
//           </div>
          
//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Wind className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Wind Speed</p>
//             <p className="text-2xl font-bold">{weather.windSpeed} km/h</p>
//           </div>
//         </div>
//       </div>

//       {/* Weather-Based Recommendations */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-6">Weather-Based Farming Advice</h3>
        
//         <div className="space-y-4">
//           {allAdvice.map((advice, index) => (
//             <div key={index} className={`border-l-4 p-4 rounded-r-lg ${
//               advice.type === 'success' ? 'border-green-500 bg-green-50' :
//               advice.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
//               'border-blue-500 bg-blue-50'
//             }`}>
//               <div className="flex items-start space-x-3">
//                 <div className="flex-shrink-0 mt-1">
//                   {advice.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
//                   {advice.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
//                   {advice.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
//                 </div>
                
//                 <div className="flex-1">
//                   <h4 className={`font-medium mb-2 ${
//                     advice.type === 'success' ? 'text-green-800' :
//                     advice.type === 'warning' ? 'text-yellow-800' :
//                     'text-blue-800'
//                   }`}>
//                     {advice.title}
//                   </h4>
                  
//                   <p className={`text-sm mb-3 ${
//                     advice.type === 'success' ? 'text-green-700' :
//                     advice.type === 'warning' ? 'text-yellow-700' :
//                     'text-blue-700'
//                   }`}>
//                     {advice.message}
//                   </p>
                  
//                   <div className="space-y-1">
//                     {advice.actions.map((action, actionIndex) => (
//                       <p key={actionIndex} className={`text-sm ${
//                         advice.type === 'success' ? 'text-green-600' :
//                         advice.type === 'warning' ? 'text-yellow-600' :
//                         'text-blue-600'
//                       }`}>
//                         • {action}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Stage-Specific Weather Advice */}
//       {latestCrop && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4 capitalize">
//             Weather Tips for {latestCrop.growthStage.replace('-', ' ')} Stage
//           </h3>
          
//           <div className="bg-purple-50 rounded-lg p-4">
//             <div className="space-y-2">
//               {stageSpecificAdvice.map((tip, index) => (
//                 <p key={index} className="text-sm text-purple-800">
//                   • {tip}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Weekly Weather Planning */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-lg font-semibold mb-4">This Week's Action Plan</h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-3">
//             <h4 className="font-medium text-gray-900">Immediate Actions (Today)</h4>
//             <div className="bg-gray-50 rounded-lg p-3 space-y-1">
//               {weather.forecast === 'rainy' ? (
//                 <>
//                   <p className="text-sm text-gray-700">• Check field drainage systems</p>
//                   <p className="text-sm text-gray-700">• Postpone fertilizer application</p>
//                   <p className="text-sm text-gray-700">• Secure any loose equipment</p>
//                 </>
//               ) : weather.temperature > 32 ? (
//                 <>
//                   <p className="text-sm text-gray-700">• Early morning field inspection</p>
//                   <p className="text-sm text-gray-700">• Check water pump functionality</p>
//                   <p className="text-sm text-gray-700">• Increase irrigation if needed</p>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-sm text-gray-700">• Regular field monitoring</p>
//                   <p className="text-sm text-gray-700">• Continue normal care routine</p>
//                   <p className="text-sm text-gray-700">• Good day for field maintenance</p>
//                 </>
//               )}
//             </div>
//           </div>
          
//           <div className="space-y-3">
//             <h4 className="font-medium text-gray-900">Planning Ahead (This Week)</h4>
//             <div className="bg-gray-50 rounded-lg p-3 space-y-1">
//               <p className="text-sm text-gray-700">• Monitor weather forecasts daily</p>
//               <p className="text-sm text-gray-700">• Plan irrigation schedule accordingly</p>
//               <p className="text-sm text-gray-700">• Prepare for any extreme weather</p>
//               <p className="text-sm text-gray-700">• Schedule next photo upload in 3-5 days</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherAdvice;





// import React from "react";
// import {
//   Cloud,
//   Sun,
//   CloudRain,
//   Thermometer,
//   Droplets,
//   Wind,
//   AlertTriangle,
//   Info,
//   CheckCircle,
//   Calendar,
// } from "lucide-react";
// import { WeatherData, CropData, ForecastDay } from "../types";

// interface WeatherAdviceProps {
//   weather: WeatherData | null;
//   cropData: CropData[];
//   forecast: ForecastDay[]; // <-- Added forecast prop
// }

// const WeatherAdvice: React.FC<WeatherAdviceProps> = ({
//   weather,
//   cropData,
//   forecast,
// }) => {
//   const latestCrop = cropData[cropData.length - 1];

//   const getWeatherIcon = (forecast: string) => {
//     switch (forecast) {
//       case "sunny":
//         return <Sun className="h-8 w-8 text-yellow-500" />;
//       case "rainy":
//         return <CloudRain className="h-8 w-8 text-blue-500" />;
//       case "cloudy":
//         return <Cloud className="h-8 w-8 text-gray-500" />;
//       default:
//         return <Sun className="h-8 w-8 text-yellow-500" />;
//     }
//   };

//   const getSuitability = (temp: number, humidity: number, forecast: string) => {
//     if (temp >= 20 && temp <= 35 && humidity >= 60 && forecast !== "rainy") {
//       return { status: "✅ Suitable", color: "text-green-600" };
//     }
//     return { status: "❌ Not Suitable", color: "text-red-600" };
//   };

//   if (!weather) {
//     return (
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">
//             Weather Data Loading...
//           </h2>
//           <p className="text-gray-600">
//             Please wait while we fetch current weather information for your area.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Current Weather Overview */}
//       <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6">
//         <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
//           {getWeatherIcon(weather.forecast)}
//           <span>Today's Weather Conditions</span>
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Thermometer className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Temperature</p>
//             <p className="text-2xl font-bold">{weather.temperature}°C</p>
//           </div>

//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Droplets className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Humidity</p>
//             <p className="text-2xl font-bold">{weather.humidity}%</p>
//           </div>

//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <CloudRain className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Rainfall</p>
//             <p className="text-2xl font-bold">{weather.rainfall}mm</p>
//           </div>

//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Wind className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Wind Speed</p>
//             <p className="text-2xl font-bold">{weather.windSpeed} km/h</p>
//           </div>
//         </div>

//         <p className="mt-4 text-lg font-semibold">
//           🌾 Paddy Suitability:{" "}
//           {getSuitability(
//             weather.temperature,
//             weather.humidity,
//             weather.forecast
//           ).status}
//         </p>
//       </div>

//       {/* Stage-Specific Weather Advice */}
//       {latestCrop && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4 capitalize">
//             Weather Tips for {latestCrop.growthStage || "current"} Stage
//           </h3>
//           <div className="bg-purple-50 rounded-lg p-4">
//             <p className="text-sm text-purple-800">
//               Continue monitoring weather to adjust irrigation and fertilizer
//               schedules.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* 5-Day Forecast */}
//       {forecast && forecast.length > 0 && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
//             <Calendar className="h-5 w-5 text-blue-600" />
//             <span>5-Day Weather Forecast</span>
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             {forecast.map((day, index) => {
//               const suitability = getSuitability(
//                 day.temperature,
//                 day.humidity,
//                 day.forecast
//               );
//               return (
//                 <div
//                   key={index}
//                   className="bg-gray-50 rounded-lg p-4 text-center shadow-sm"
//                 >
//                   <p className="font-medium text-gray-700">{day.date}</p>
//                   <div className="flex justify-center my-2">
//                     {getWeatherIcon(day.forecast)}
//                   </div>
//                   <p className="text-sm">🌡 {day.temperature}°C</p>
//                   <p className="text-sm">💧 {day.humidity}%</p>
//                   <p className={`mt-2 text-sm font-semibold ${suitability.color}`}>
//                     {suitability.status}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeatherAdvice;




// import React from "react";
// import {
//   Cloud,
//   Sun,
//   CloudRain,
//   Thermometer,
//   Droplets,
//   Wind,
//   Calendar,
// } from "lucide-react";
// import { WeatherData, CropData, ForecastDay } from "../types";

// interface WeatherAdviceProps {
//   weather: WeatherData | null;
//   cropData: CropData[];
//   forecast: ForecastDay[]; // <-- Forecast prop
// }

// const WeatherAdvice: React.FC<WeatherAdviceProps> = ({
//   weather,
//   cropData,
//   forecast,
// }) => {
//   const latestCrop = cropData[cropData.length - 1];

//   const getWeatherIcon = (forecast: string) => {
//     switch (forecast) {
//       case "sunny":
//         return <Sun className="h-8 w-8 text-yellow-500" />;
//       case "rainy":
//         return <CloudRain className="h-8 w-8 text-blue-500" />;
//       case "cloudy":
//         return <Cloud className="h-8 w-8 text-gray-500" />;
//       default:
//         return <Sun className="h-8 w-8 text-yellow-500" />;
//     }
//   };

//   const getSuitability = (temp: number, humidity: number, forecast: string) => {
//     if (temp >= 20 && temp <= 35 && humidity >= 60 && forecast !== "rainy") {
//       return { status: "✅ Suitable", color: "text-green-600" };
//     }
//     return { status: "❌ Not Suitable", color: "text-red-600" };
//   };

//   if (!weather) {
//     return (
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">
//             Weather Data Loading...
//           </h2>
//           <p className="text-gray-600">
//             Please wait while we fetch current weather information for your area.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Current Weather Overview */}
//       <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6">
//         <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
//           {getWeatherIcon(weather.forecast)}
//           <span>Today's Weather Conditions</span>
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Thermometer className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Temperature</p>
//             <p className="text-2xl font-bold">{weather.temperature}°C</p>
//           </div>

//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Droplets className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Humidity</p>
//             <p className="text-2xl font-bold">{weather.humidity}%</p>
//           </div>

//           <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
//             <Wind className="h-6 w-6 mx-auto mb-2" />
//             <p className="text-sm opacity-90">Wind Speed</p>
//             <p className="text-2xl font-bold">{weather.windSpeed} km/h</p>
//           </div>
//         </div>

//         <p className="mt-4 text-lg font-semibold">
//           🌾 Paddy Suitability:{" "}
//           {getSuitability(weather.temperature, weather.humidity, weather.forecast)
//             .status}
//         </p>
//       </div>

//       {/* Stage-Specific Weather Advice */}
//       {latestCrop && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4 capitalize">
//             Weather Tips for {latestCrop.growthStage || "current"} Stage
//           </h3>
//           <div className="bg-purple-50 rounded-lg p-4">
//             <p className="text-sm text-purple-800">
//               Continue monitoring weather to adjust irrigation and fertilizer
//               schedules.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* 5-Day Forecast */}
//       {forecast && forecast.length > 0 && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
//             <Calendar className="h-5 w-5 text-blue-600" />
//             <span>5-Day Weather Forecast</span>
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             {forecast.map((day, index) => {
//               const suitability = getSuitability(
//                 day.temperature,
//                 day.humidity,
//                 day.forecast
//               );
//               return (
//                 <div
//                   key={index}
//                   className="bg-gray-50 rounded-lg p-4 text-center shadow-sm"
//                 >
//                   <p className="font-medium text-gray-700">{day.date}</p>
//                   <div className="flex justify-center my-2">
//                     {getWeatherIcon(day.forecast)}
//                   </div>
//                   <p className="text-sm">🌡 {day.temperature}°C</p>
//                   <p className="text-sm">💧 {day.humidity}%</p>
//                   <p
//                     className={`mt-2 text-sm font-semibold ${suitability.color}`}
//                   >
//                     {suitability.status}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeatherAdvice;



import React from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
} from "lucide-react";
import { WeatherData, CropData, ForecastDay } from "../types";

interface WeatherAdviceProps {
  weather: WeatherData | null;
  cropData: CropData[];
  forecast: ForecastDay[];
  selectedCrop: "paddy" | "ragi" | "wheat"; // <-- added
}

const WeatherAdvice: React.FC<WeatherAdviceProps> = ({
  weather,
  cropData,
  forecast,
  selectedCrop,
}) => {
  const latestCrop = cropData[cropData.length - 1];

  const getWeatherIcon = (forecast: string) => {
    switch (forecast) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getSuitability = (temp: number, humidity: number, forecast: string) => {
    if (temp >= 20 && temp <= 35 && humidity >= 60 && forecast !== "rainy") {
      return { status: "✅ Suitable", color: "text-green-600" };
    }
    return { status: "❌ Not Suitable", color: "text-red-600" };
  };

  if (!weather) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Weather Data Loading...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch current weather information for your area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Current Weather Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          {getWeatherIcon(weather.forecast)}
          <span>Today's Weather Conditions</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Thermometer className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm opacity-90">Temperature</p>
            <p className="text-2xl font-bold">{weather.temperature}°C</p>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Droplets className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm opacity-90">Humidity</p>
            <p className="text-2xl font-bold">{weather.humidity}%</p>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Wind className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm opacity-90">Wind Speed</p>
            <p className="text-2xl font-bold">{weather.windSpeed} km/h</p>
          </div>
        </div>

        <p className="mt-4 text-lg font-semibold capitalize">
          🌾 {selectedCrop} Suitability:{" "}
          {getSuitability(weather.temperature, weather.humidity, weather.forecast).status}
        </p>
      </div>

      {/* Stage-Specific Weather Advice */}
      {latestCrop && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 capitalize">
            Weather Tips for {latestCrop.growthStage || "current"} Stage
          </h3>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-800">
              Continue monitoring weather to adjust irrigation and fertilizer schedules.
            </p>
          </div>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast && forecast.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>5-Day Weather Forecast</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => {
              const suitability = getSuitability(
                day.temperature,
                day.humidity,
                day.forecast
              );
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 text-center shadow-sm"
                >
                  <p className="font-medium text-gray-700">{day.date}</p>
                  <div className="flex justify-center my-2">
                    {getWeatherIcon(day.forecast)}
                  </div>
                  <p className="text-sm">🌡 {day.temperature}°C</p>
                  <p className="text-sm">💧 {day.humidity}%</p>
                  <p
                    className={`mt-2 text-sm font-semibold ${suitability.color}`}
                  >
                    {suitability.status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherAdvice;
