import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Info, Calendar, Ruler, Leaf } from 'lucide-react';
import { CropData, GrowthStandards } from '../types';

interface GrowthAnalysisProps {
  cropData: CropData[];
  seedingDate: string;
  selectedCrop: "paddy" | "ragi" | "wheat";
}

export const growthStandards: GrowthStandards = {
  'seedling': {
    expectedHeight: { min: 5, max: 15 },
    expectedLeafArea: { min: 20, max: 60 },
    daysRange: { min: 0, max: 20 },
    description: 'Young plants establishing roots and first leaves',
    keyActivities: ['Maintain soil moisture', 'Protect from pests', 'Ensure proper drainage']
  },
  'tillering': {
    expectedHeight: { min: 15, max: 35 },
    expectedLeafArea: { min: 60, max: 150 },
    daysRange: { min: 15, max: 35 },
    description: 'Plants developing multiple shoots and leaves',
    keyActivities: ['Apply nitrogen fertilizer', 'Maintain 2-3cm water depth', 'Control weeds']
  },
  'stem-elongation': {
    expectedHeight: { min: 35, max: 65 },
    expectedLeafArea: { min: 150, max: 300 },
    daysRange: { min: 30, max: 50 },
    description: 'Rapid vertical growth and stem development',
    keyActivities: ['Increase water depth to 5-7cm', 'Monitor for pests', 'Apply balanced fertilizer']
  },
  'panicle-initiation': {
    expectedHeight: { min: 65, max: 85 },
    expectedLeafArea: { min: 300, max: 500 },
    daysRange: { min: 45, max: 65 },
    description: 'Formation of flower clusters begins',
    keyActivities: ['Reduce nitrogen', 'Increase potassium', 'Maintain consistent water levels']
  },
  'flowering': {
    expectedHeight: { min: 80, max: 100 },
    expectedLeafArea: { min: 450, max: 650 },
    daysRange: { min: 60, max: 80 },
    description: 'Flowers bloom and pollination occurs',
    keyActivities: ['Keep fields flooded', 'Avoid pesticide spraying', 'Monitor for diseases']
  },
  'grain-filling': {
    expectedHeight: { min: 95, max: 110 },
    expectedLeafArea: { min: 500, max: 700 },
    daysRange: { min: 75, max: 95 },
    description: 'Grains develop and mature inside the husks',
    keyActivities: ['Maintain adequate water', 'Apply phosphorus', 'Prepare for harvest']
  },
  'maturity': {
    expectedHeight: { min: 100, max: 120 },
    expectedLeafArea: { min: 400, max: 600 },
    daysRange: { min: 90, max: 120 },
    description: 'Grains are fully mature and ready for harvest',
    keyActivities: ['Drain fields gradually', 'Plan harvest timing', 'Check grain moisture']
  }
};

const GrowthAnalysis: React.FC<GrowthAnalysisProps> = ({ cropData, seedingDate }) => {
  const latestData = cropData[cropData.length - 1];

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'slow': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'stunted': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5" />;
      case 'slow': return <Info className="h-5 w-5" />;
      case 'stunted': return <AlertCircle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const getDetailedAnalysis = (data: CropData) => {
    const standards = growthStandards[data.growthStage];
    const heightStatus = data.height >= standards.expectedHeight.min && data.height <= standards.expectedHeight.max;
    const leafAreaStatus = data.leafArea >= standards.expectedLeafArea.min && data.leafArea <= standards.expectedLeafArea.max;

    return {
      heightStatus,
      leafAreaStatus,
      standards,
      recommendations: getRecommendations(data, standards, heightStatus, leafAreaStatus)
    };
  };

  const getRecommendations = (data: CropData, standards: any, heightOk: boolean, leafAreaOk: boolean) => {
    const recommendations = [];

    if (!heightOk) {
      if (data.height < standards.expectedHeight.min) {
        recommendations.push({
          type: 'warning',
          title: 'Height Below Expected',
          message: 'Your crop is shorter than expected for this stage. Consider checking soil nutrients and water management.',
          actions: ['Apply balanced fertilizer', 'Ensure proper irrigation', 'Check for pest damage']
        });
      } else if (data.height > standards.expectedHeight.max) {
        recommendations.push({
          type: 'info',
          title: 'Height Above Expected',
          message: 'Your crop is taller than expected. This could be due to excessive nitrogen. Monitor for lodging (stem bending).',
          actions: ['Reduce nitrogen in next fertilizer application', 'Ensure good sunlight exposure']
        });
      }
    }

    if (!leafAreaOk) {
      if (data.leafArea < standards.expectedLeafArea.min) {
        recommendations.push({
          type: 'warning',
          title: 'Limited Leaf Development',
          message: 'Leaf growth is below optimal levels. This might affect photosynthesis and overall yield.',
          actions: ['Apply nitrogen fertilizer', 'Improve water management', 'Control competing weeds']
        });
      } else if (data.leafArea > standards.expectedLeafArea.max) {
        recommendations.push({
          type: 'info',
          title: 'Excessive Leaf Growth',
          message: 'Leaf area is very high, which can increase disease risk due to poor air circulation.',
          actions: ['Reduce nitrogen application', 'Monitor for fungal diseases', 'Ensure proper plant spacing']
        });
      }
    }

    if (data.healthStatus === 'healthy' && heightOk && leafAreaOk) {
      recommendations.push({
        type: 'success',
        title: 'Excellent Growth Progress',
        message: 'Your crop is developing very well! Continue with current care practices.',
        actions: ['Maintain current watering schedule', 'Continue regular monitoring', 'Prepare for next growth stage']
      });
    }

    // Add a default recommendation if no specific issues are found but the crop is not perfectly healthy
    if (recommendations.length === 0 && data.healthStatus !== 'healthy') {
      recommendations.push({
        type: 'info',
        title: 'General Monitoring Advised',
        message: `The crop's health status is marked as '${data.healthStatus}'. While specific metrics are within range, continue to monitor for any changes.`,
        actions: ['Check for subtle signs of pests or disease', 'Ensure consistent environmental conditions', 'Compare with previous photos for trends']
      });
    }

    return recommendations;
  };

  const calculateGrowthRate = () => {
    if (cropData.length < 2) return null;
    
    const recent = cropData.slice(-2);
    const heightGrowth = recent[1].height - recent[0].height;
    const leafAreaGrowth = recent[1].leafArea - recent[0].leafArea;
    const daysDiff = Math.abs(new Date(recent[1].date).getTime() - new Date(recent[0].date).getTime()) / (1000 * 60 * 60 * 24);

    const isSameDayUpload = daysDiff < 1;

    // If daysDiff is 0 (or less than 1), it means photos were taken on the same day or very close together.
    // To avoid division by zero (which results in "Infinity"), we'll treat the minimum difference as 1 day.
    const effectiveDaysDiff = Math.max(daysDiff, 1);

    return {
      heightRate: (heightGrowth / effectiveDaysDiff).toFixed(1),
      leafAreaRate: (leafAreaGrowth / effectiveDaysDiff).toFixed(1),
      daysDiff: Math.round(daysDiff),
      isSameDayUpload: isSameDayUpload
    };
  };

  if (cropData.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Data Available</h2>
          <p className="text-gray-600 mb-6">
            Upload some crop photos to see detailed growth analysis and recommendations.
          </p>
        </div>
      </div>
    );
  }

  const analysis = getDetailedAnalysis(latestData);
  const growthRate = calculateGrowthRate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Current Status Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span>Growth Analysis Report</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`border rounded-lg p-4 ${getHealthStatusColor(latestData.healthStatus)}`}>
            <div className="flex items-center space-x-2 mb-2">
              {getHealthIcon(latestData.healthStatus)}
              <span className="font-medium capitalize">Overall Health</span>
            </div>
            <p className="text-2xl font-bold capitalize">{latestData.healthStatus}</p>
            <p className="text-sm mt-1">Based on latest analysis</p>
          </div>

          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2 text-blue-600">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Growth Stage</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 capitalize">
              {latestData.growthStage.replace('-', ' ')}
            </p>
            <p className="text-sm text-blue-700 mt-1">Day {latestData.daysAfterSeeding}</p>
          </div>

          <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2 text-purple-600">
              <Ruler className="h-5 w-5" />
              <span className="font-medium">Latest Measurements</span>
            </div>
            <p className="text-lg font-bold text-purple-900">{latestData.height} cm</p>
            <p className="text-sm text-purple-700">{latestData.leafArea} cm² leaf area</p>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Ruler className="h-5 w-5 text-blue-500" />
            <span>Height Analysis</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Height:</span>
              <span className="font-bold text-xl">{latestData.height} cm</span>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Expected Range</span>
                <span>{analysis.standards.expectedHeight.min} - {analysis.standards.expectedHeight.max} cm</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${analysis.heightStatus ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    width: `${Math.min(100, (latestData.height / analysis.standards.expectedHeight.max) * 100)}%`
                  }}
                ></div>
              </div>
              <p className={`text-sm mt-2 ${analysis.heightStatus ? 'text-green-600' : 'text-red-600'}`}>
                {analysis.heightStatus ? '✓ Within expected range' : '⚠ Outside expected range'}
              </p>
            </div>

            {growthRate && (
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Growth Rate:</strong> {growthRate.heightRate} cm/day
                  <br />
                  <span className="text-xs">Based on last {growthRate.daysDiff} days</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-500" />
            <span>Leaf Development</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Leaf Coverage:</span>
              <span className="font-bold text-xl">{latestData.leafArea} cm²</span>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Expected Range</span>
                <span>{analysis.standards.expectedLeafArea.min} - {analysis.standards.expectedLeafArea.max} cm²</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${analysis.leafAreaStatus ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    width: `${Math.min(100, (latestData.leafArea / analysis.standards.expectedLeafArea.max) * 100)}%`
                  }}
                ></div>
              </div>
              <p className={`text-sm mt-2 ${analysis.leafAreaStatus ? 'text-green-600' : 'text-red-600'}`}>
                {analysis.leafAreaStatus ? '✓ Within expected range' : '⚠ Outside expected range'}
              </p>
            </div>

            {growthRate && (
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <strong>Expansion Rate:</strong> {growthRate.leafAreaRate} cm²/day
                  <br />
                  <span className="text-xs">Based on last {growthRate.daysDiff} days</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Same Day Upload Notification */}
      {growthRate && growthRate.isSameDayUpload && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-r-lg" role="alert">
          <div className="flex items-center">
            <Info className="h-5 w-5 mr-3" />
            <p><strong>Note:</strong> Multiple photos were uploaded on the same day. The calculated growth rates reflect changes within a 24-hour period.</p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recommendations & Action Items</h3>
        
        <div className="space-y-4">
          {analysis.recommendations.map((rec, index) => (
            <div key={index} className={`border-l-4 p-4 ${
              rec.type === 'success' ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'
            }`}>
              <h4 className={`font-medium mb-2 ${
                rec.type === 'success' ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {rec.title}
              </h4>
              <p className={`text-sm mb-3 ${
                rec.type === 'success' ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {rec.message}
              </p>
              <div className="space-y-1">
                {rec.actions.map((action, actionIndex) => (
                  <p key={actionIndex} className={`text-sm ${
                    rec.type === 'success' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    • {action}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Current Growth Stage: {latestData.growthStage.replace('-', ' ')}</h3>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <p className="text-blue-800 mb-3">{analysis.standards.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Stage Duration:</h4>
              <p className="text-sm text-blue-700">
                Days {analysis.standards.daysRange.min}-{analysis.standards.daysRange.max} after seeding
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Your Progress:</h4>
              <p className="text-sm text-blue-700">
                Day {latestData.daysAfterSeeding} - {
                  latestData.daysAfterSeeding >= analysis.standards.daysRange.min && 
                  latestData.daysAfterSeeding <= analysis.standards.daysRange.max
                    ? 'On track' : 'Stage timing varies'
                }
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Key Activities for This Stage:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {analysis.standards.keyActivities.map((activity, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">• {activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthAnalysis;