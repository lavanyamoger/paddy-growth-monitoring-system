// export interface CropData {
//   id: string;
//   date: string;
//   imageUrl: string;
//   height: number; // in cm
//   leafArea: number; // in cm²
//   growthStage: 'seedling' | 'tillering' | 'stem-elongation' | 'panicle-initiation' | 'flowering' | 'grain-filling' | 'maturity';
//   healthStatus: 'healthy' | 'slow' | 'stunted';
//   daysAfterSeeding: number;
// }

// export interface WeatherData {
//   temperature: number; // in Celsius
//   humidity: number; // in percentage
//   rainfall: number; // in mm
//   forecast: 'sunny' | 'rainy' | 'cloudy';
//   windSpeed: number; // in km/h
// }

// export interface GrowthStandards {
//   [key: string]: {
//     expectedHeight: { min: number; max: number };
//     expectedLeafArea: { min: number; max: number };
//     daysRange: { min: number; max: number };
//     description: string;
//     keyActivities: string[];
//   };
// }






// ✅ Crop growth data collected from image analysis or manual input
export interface CropData {
  id: string;
  date: string;
  imageUrl: string;
  height: number; // in cm
  leafArea: number; // in cm²
  growthStage:
    | "seedling"
    | "tillering"
    | "stem-elongation"
    | "panicle-initiation"
    | "flowering"
    | "grain-filling"
    | "maturity";
  healthStatus: "healthy" | "slow" | "stunted";
  daysAfterSeeding: number;
  cropType: "paddy" | "ragi" | "wheat"; // ✅ Multi-crop support
}

// ✅ Weather details for selected location
export interface WeatherData {
  temperature: number; // in Celsius
  humidity: number; // in percentage
  rainfall: number; // in mm
  forecast: "sunny" | "rainy" | "cloudy";
  windSpeed: number; // in km/h
}

// ✅ Growth Standards for each crop and stage
export interface GrowthStandards {
  [cropType: string]: {
    [stage: string]: {
      expectedHeight: { min: number; max: number };
      expectedLeafArea: { min: number; max: number };
      daysRange: { min: number; max: number };
      description: string;
      keyActivities: string[];
    };
  };
}

// ✅ Example growth standards database for Paddy, Ragi, Wheat
export const growthStandards: GrowthStandards = {
  // 🌾 Paddy Growth Standards
  paddy: {
    seedling: {
      expectedHeight: { min: 5, max: 15 },
      expectedLeafArea: { min: 2, max: 5 },
      daysRange: { min: 0, max: 20 },
      description: "Paddy seedlings are establishing roots.",
      keyActivities: ["Maintain shallow water", "Apply starter fertilizer"],
    },
    tillering: {
      expectedHeight: { min: 20, max: 40 },
      expectedLeafArea: { min: 10, max: 25 },
      daysRange: { min: 21, max: 45 },
      description: "Tillers (side shoots) start developing.",
      keyActivities: ["Weed management", "Ensure proper irrigation"],
    },
    "stem-elongation": {
      expectedHeight: { min: 40, max: 80 },
      expectedLeafArea: { min: 25, max: 50 },
      daysRange: { min: 46, max: 70 },
      description: "Stem elongates, plant height increases rapidly.",
      keyActivities: ["Nitrogen fertilizer", "Pest control"],
    },
    "panicle-initiation": {
      expectedHeight: { min: 70, max: 100 },
      expectedLeafArea: { min: 40, max: 70 },
      daysRange: { min: 71, max: 90 },
      description: "Panicle primordia begin to form.",
      keyActivities: ["Maintain standing water", "Apply phosphorus"],
    },
    flowering: {
      expectedHeight: { min: 90, max: 120 },
      expectedLeafArea: { min: 60, max: 90 },
      daysRange: { min: 91, max: 110 },
      description: "Flowering occurs, critical for grain setting.",
      keyActivities: ["Irrigation", "Protect against pests/diseases"],
    },
    "grain-filling": {
      expectedHeight: { min: 100, max: 130 },
      expectedLeafArea: { min: 70, max: 100 },
      daysRange: { min: 111, max: 130 },
      description: "Grains fill with starch, crop matures.",
      keyActivities: ["Monitor irrigation", "Control diseases"],
    },
    maturity: {
      expectedHeight: { min: 110, max: 140 },
      expectedLeafArea: { min: 70, max: 90 },
      daysRange: { min: 131, max: 150 },
      description: "Paddy is ready for harvest.",
      keyActivities: ["Drain water", "Prepare for harvesting"],
    },
  },

  // 🌱 Ragi Growth Standards
  ragi: {
    seedling: {
      expectedHeight: { min: 3, max: 10 },
      expectedLeafArea: { min: 1, max: 4 },
      daysRange: { min: 0, max: 15 },
      description: "Ragi seedlings are sensitive to drought.",
      keyActivities: ["Light irrigation", "Apply basal fertilizer"],
    },
    tillering: {
      expectedHeight: { min: 15, max: 30 },
      expectedLeafArea: { min: 8, max: 20 },
      daysRange: { min: 16, max: 40 },
      description: "Tillers emerge and strengthen plant base.",
      keyActivities: ["Thinning", "Weeding", "Light irrigation"],
    },
    "stem-elongation": {
      expectedHeight: { min: 30, max: 60 },
      expectedLeafArea: { min: 20, max: 40 },
      daysRange: { min: 41, max: 65 },
      description: "Stem grows rapidly, requires nutrients.",
      keyActivities: ["Apply nitrogen", "Irrigation at intervals"],
    },
    "panicle-initiation": {
      expectedHeight: { min: 50, max: 80 },
      expectedLeafArea: { min: 35, max: 60 },
      daysRange: { min: 66, max: 85 },
      description: "Panicle development starts.",
      keyActivities: ["Maintain soil moisture", "Pest management"],
    },
    flowering: {
      expectedHeight: { min: 70, max: 100 },
      expectedLeafArea: { min: 50, max: 70 },
      daysRange: { min: 86, max: 105 },
      description: "Flowering is crucial for grain yield.",
      keyActivities: ["Ensure irrigation", "Control pests"],
    },
    "grain-filling": {
      expectedHeight: { min: 80, max: 110 },
      expectedLeafArea: { min: 55, max: 80 },
      daysRange: { min: 106, max: 125 },
      description: "Grain starch accumulation begins.",
      keyActivities: ["Monitor irrigation", "Disease management"],
    },
    maturity: {
      expectedHeight: { min: 90, max: 120 },
      expectedLeafArea: { min: 50, max: 70 },
      daysRange: { min: 126, max: 140 },
      description: "Ragi crop is ready for harvest.",
      keyActivities: ["Reduce irrigation", "Harvest at proper time"],
    },
  },

  // 🌾 Wheat Growth Standards
  wheat: {
    seedling: {
      expectedHeight: { min: 5, max: 12 },
      expectedLeafArea: { min: 2, max: 6 },
      daysRange: { min: 0, max: 18 },
      description: "Wheat seedlings require cool weather.",
      keyActivities: ["Light irrigation", "Apply starter nitrogen"],
    },
    tillering: {
      expectedHeight: { min: 18, max: 35 },
      expectedLeafArea: { min: 10, max: 22 },
      daysRange: { min: 19, max: 45 },
      description: "Tillering is crucial for yield formation.",
      keyActivities: ["Nitrogen application", "Irrigate at crown root stage"],
    },
    "stem-elongation": {
      expectedHeight: { min: 35, max: 70 },
      expectedLeafArea: { min: 20, max: 45 },
      daysRange: { min: 46, max: 70 },
      description: "Rapid stem elongation phase.",
      keyActivities: ["Irrigation", "Weed control"],
    },
    "panicle-initiation": {
      expectedHeight: { min: 60, max: 90 },
      expectedLeafArea: { min: 40, max: 65 },
      daysRange: { min: 71, max: 90 },
      description: "Panicle primordia develop.",
      keyActivities: ["Phosphorus fertilizer", "Irrigation"],
    },
    flowering: {
      expectedHeight: { min: 80, max: 110 },
      expectedLeafArea: { min: 55, max: 75 },
      daysRange: { min: 91, max: 115 },
      description: "Flowering is critical for pollination.",
      keyActivities: ["Adequate irrigation", "Disease protection"],
    },
    "grain-filling": {
      expectedHeight: { min: 90, max: 120 },
      expectedLeafArea: { min: 60, max: 80 },
      daysRange: { min: 116, max: 135 },
      description: "Grain starch accumulation starts.",
      keyActivities: ["Monitor irrigation", "Protect against rust"],
    },
    maturity: {
      expectedHeight: { min: 100, max: 130 },
      expectedLeafArea: { min: 55, max: 70 },
      daysRange: { min: 136, max: 150 },
      description: "Wheat is ready for harvest.",
      keyActivities: ["Stop irrigation", "Harvest at golden yellow stage"],
    },
  },
};
