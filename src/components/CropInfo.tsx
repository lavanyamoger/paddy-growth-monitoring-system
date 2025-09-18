// import React from "react";

// interface CropInfoProps {
//   cropType: "paddy" | "ragi" | "wheat";
// }

// const CropInfo: React.FC<CropInfoProps> = ({ cropType }) => {
//   const getCropDetails = () => {
//     switch (cropType) {
//       case "paddy":
//         return {
//           name: "Paddy",
//           description:
//             "Paddy, also known as rice, is a staple food in many cultures...",
//           weatherCondition: "Paddy grows best in warm, humid climates...",
//           seedingTime: "The ideal seeding time for paddy is...",
//           growingTime: "Paddy typically requires...",
//           fertilizer: "Common fertilizers used for paddy are...",
//           additionalInfo:
//             "For more information, consult your local agricultural extension office.",
//         };
//       case "ragi":
//         return {
//           name: "Ragi",
//           description: "Ragi, also known as finger millet...",
//           weatherCondition: "Ragi thrives in...",
//           seedingTime: "Optimal seeding time for ragi is...",
//           growingTime: "Ragi needs...",
//           fertilizer: "Use the following fertilizers for ragi...",
//           additionalInfo: "Consult local experts for specific advice.",
//         };
//       case "wheat":
//         return {
//           name: "Wheat",
//           description: "Wheat is a cereal grain...",
//           weatherCondition: "Wheat does well in...",
//           seedingTime: "Wheat should be seeded around...",
//           growingTime: "The typical growing season for wheat is...",
//           fertilizer: "Fertilizer recommendations for wheat include...",
//           additionalInfo: "Contact your local agricultural extension for details.",
//         };
//       default:
//         return {
//           name: "Unknown",
//           description: "No information available for this crop type.",
//           weatherCondition: "N/A",
//           seedingTime: "N/A",
//           growingTime: "N/A",
//           fertilizer: "N/A",
//           additionalInfo: "N/A",
//         };
//     }
//   };

//   const cropDetails = getCropDetails();

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold mb-4">
//         {cropDetails.name} Cultivation Guide
//       </h2>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-2">Description</h3>
//         <p>{cropDetails.description}</p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-2">Weather Conditions</h3>
//         <p>{cropDetails.weatherCondition}</p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-2">Seeding Time</h3>
//         <p>{cropDetails.seedingTime}</p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-2">Growing Time</h3>
//         <p>{cropDetails.growingTime}</p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-2">Fertilizer</h3>
//         <p>{cropDetails.fertilizer}</p>
//       </div>

//       <div className="bg-gray-50 rounded-lg p-6">
//         <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
//         <p>{cropDetails.additionalInfo}</p>
//       </div>
//     </div>
//   );
// };

// export default CropInfo;



import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface CropInfoProps {
  cropType: "paddy" | "ragi" | "wheat";
}

const CropInfo: React.FC<CropInfoProps> = ({ cropType }) => {
  const getCropDetails = () => {
    switch (cropType) {
      case "paddy":
        return {
          name: "Paddy (Rice)",
          description:
            "Paddy is the most widely grown cereal crop and a staple food for over half of the world. It thrives in waterlogged fields, rich in carbohydrates, and provides significant dietary energy.",
          weatherCondition:
            "Paddy needs warm, humid climates (20°C–35°C) with 150–200 cm rainfall or assured irrigation. High humidity is crucial. Dry spells can damage crops.",
          seedingTime:
            "Best sown in Kharif (June–July, monsoon season). Some regions also grow Rabi paddy (Nov–Dec). Usually raised in nurseries and then transplanted.",
          soilPreparation:
            "Requires puddled, nutrient-rich clay or loamy soil. Fields are ploughed, flooded, leveled, and bunded to retain water. Soil must be fertile with good organic matter.",
          plantingMethod:
            "Two methods: transplanting seedlings from nursery into puddled fields or direct seeding. Transplanting ensures stronger seedlings. Spacing is key.",
          watering:
            "Needs continuous water (5–10 cm depth) during growth. Irrigation is critical during flowering. Drain fields before harvesting.",
          fertilizer:
            "Needs Nitrogen, Phosphorus, Potassium in split doses. Farmyard manure improves soil. Zinc & iron added if deficient. Avoid excess nitrogen.",
          cropCare:
            "Weeding and pest management are vital. Common pests: stem borer, leaf folder, brown planthopper. Diseases: blast, bacterial blight. IPM recommended.",
          harvesting:
            "Harvest when grains turn golden-yellow with 20–25% moisture. Use sickles or combine harvesters. Dry grains to 12–14% moisture for storage.",
          roadmap: [
            { stage: "Soil Prep", time: "Before sowing" },
            { stage: "Seeding/Nursery", time: "June–July" },
            { stage: "Transplanting", time: "3–4 weeks after sowing" },
            { stage: "Tillering", time: "30–45 days" },
            { stage: "Flowering", time: "60–80 days" },
            { stage: "Grain Filling", time: "80–110 days" },
            { stage: "Harvest", time: "120–150 days" },
          ],
        };
      case "ragi":
        return {
          name: "Ragi (Finger Millet)",
          description:
            "Ragi is a hardy millet crop, rich in calcium, iron, and fiber. It is widely grown in semi-arid regions, drought-resistant, and used for rotis, porridges, and drinks.",
          weatherCondition:
            "Thrives in 20°C–30°C, with 40–100 cm rainfall. Drought-tolerant, needs well-drained soils. Does not tolerate waterlogging.",
          seedingTime:
            "Sown in Kharif (June–August) and sometimes Rabi (Oct–Dec). Timely sowing ensures higher yield.",
          soilPreparation:
            "Grows in red loamy and sandy loam soils. Ploughed, leveled, and manured with organics. Ridges/furrows improve drainage.",
          plantingMethod:
            "Broadcasting or line sowing (22–25 cm apart). Transplanting from nurseries is also used. Seeds sown 2–3 cm deep.",
          watering:
            "Mostly rainfed, but irrigation needed at flowering and grain filling. Avoid waterlogging. Drip irrigation improves efficiency.",
          fertilizer:
            "Needs moderate Nitrogen, Phosphorus, Potassium. Farmyard manure improves soil. Micronutrients added if deficient.",
          cropCare:
            "Weeding during first 30 days is critical. Pests: shoot fly, aphids. Disease: blast fungus. Crop rotation helps.",
          harvesting:
            "Ready in 100–120 days. Harvest when ear heads turn brown. Sun-dry, thresh, and store grains safely.",
          roadmap: [
            { stage: "Soil Prep", time: "Before monsoon" },
            { stage: "Sowing", time: "June–July" },
            { stage: "Vegetative Growth", time: "20–40 days" },
            { stage: "Flowering", time: "50–70 days" },
            { stage: "Grain Filling", time: "70–100 days" },
            { stage: "Harvest", time: "100–120 days" },
          ],
        };
      case "wheat":
        return {
          name: "Wheat",
          description:
            "Wheat is the second most important cereal crop globally, staple for bread, chapati, and bakery products. Rich in carbohydrates and proteins.",
          weatherCondition:
            "Requires cool, dry climate. 15°C–20°C for germination, 20°C–25°C for grain filling. Needs 50–90 cm rainfall. Excess humidity is harmful.",
          seedingTime:
            "Sown in Rabi season (Oct–Dec), harvested (Mar–Apr). Timely sowing ensures best yields.",
          soilPreparation:
            "Well-drained loamy/clay soils with organic matter are ideal. Fine seedbed ensures germination.",
          plantingMethod:
            "Line sowing with seed drills (20–25 cm apart). Seeds sown 4–5 cm deep. Seed treatment prevents fungal infections.",
          watering:
            "Needs 4–6 irrigations. Critical stages: root initiation, tillering, booting, flowering, grain filling. Drain excess water.",
          fertilizer:
            "Balanced NPK fertilizers with organic manure. Zinc and sulphur if deficient.",
          cropCare:
            "Weeding is crucial. Pests: aphids, termites. Diseases: rust, smut. Crop rotation improves soil and reduces risks.",
          harvesting:
            "Harvest when crop turns golden-yellow. Manual or combine harvesting. Dry grains to 12–13% moisture for safe storage.",
          roadmap: [
            { stage: "Soil Prep", time: "Before October" },
            { stage: "Sowing", time: "Oct–Dec" },
            { stage: "Tillering", time: "30–45 days" },
            { stage: "Booting", time: "60–70 days" },
            { stage: "Flowering", time: "70–90 days" },
            { stage: "Grain Filling", time: "90–110 days" },
            { stage: "Harvest", time: "120–150 days" },
          ],
        };
      default:
        return {
          name: "Unknown",
          description: "No information available.",
          weatherCondition: "N/A",
          seedingTime: "N/A",
          soilPreparation: "N/A",
          plantingMethod: "N/A",
          watering: "N/A",
          fertilizer: "N/A",
          cropCare: "N/A",
          harvesting: "N/A",
          roadmap: [],
        };
    }
  };

  const cropDetails = getCropDetails();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-4">
        {cropDetails.name} Cultivation Guide
      </h2>

      {/* Sections */}
      {[
        { title: "Description", content: cropDetails.description },
        { title: "Weather Conditions", content: cropDetails.weatherCondition },
        { title: "Seeding Time", content: cropDetails.seedingTime },
        { title: "Soil Preparation", content: cropDetails.soilPreparation },
        { title: "Planting Method", content: cropDetails.plantingMethod },
        { title: "Watering & Irrigation", content: cropDetails.watering },
        { title: "Fertilizer", content: cropDetails.fertilizer },
        { title: "Crop Care", content: cropDetails.cropCare },
        { title: "Harvesting", content: cropDetails.harvesting },
      ].map((sec, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{sec.title}</h3>
          <p className="text-gray-700">{sec.content}</p>
        </div>
      ))}

      {/* Roadmap Chart */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          {cropDetails.name} Growth Roadmap
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cropDetails.roadmap}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis hide />
            <Tooltip />
            <Line type="monotone" dataKey="time" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CropInfo;
