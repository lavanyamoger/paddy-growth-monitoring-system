import React, { useState, useRef } from 'react';
import { Camera, Upload, Calendar, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { CropData } from '../types';

interface ImageUploadProps {
  onDataAdd: (data: CropData) => void;
  seedingDate: string;
  onSeedingDateChange: (date: string) => void;
  selectedCrop: 'paddy' | 'ragi' | 'wheat';
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onDataAdd, seedingDate, onSeedingDateChange, selectedCrop }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isCheckingImage, setIsCheckingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateImageContentValidation = async (file: File, cropType: 'paddy' | 'ragi' | 'wheat'): Promise<boolean> => {
    // This is an advanced simulation that analyzes image content based on color profiles.
    // It's a step up from checking filenames and closer to how a real ML model might work,
    // without needing a full ML library.
    console.log(`Simulating content analysis for a "${cropType}" image: ${file.name}...`);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (!imageUrl) {
          return reject(new Error('Could not read image file.'));
        }

        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          // Create an offscreen canvas to analyze the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) {
            return reject(new Error('Could not get canvas context.'));
          }

          // Scale down for performance. A 100x100 sample is enough for this simulation.
          const size = 100;
          canvas.width = size;
          canvas.height = size;
          ctx.drawImage(image, 0, 0, size, size);

          const imageData = ctx.getImageData(0, 0, size, size).data;
          let greenCount = 0;
          let skinCount = 0;
          let brownYellowCount = 0;
          let reddishCount = 0;
          const totalPixels = size * size;

          for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];

            // Heuristic for green (likely a plant)
            if (g > r + 10 && g > b + 10) greenCount++;

            // Heuristic for skin tones (likely a human). This is simplified and has biases.
            if (r > 95 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15) skinCount++;

            // Heuristic for brown/yellow (mature wheat/paddy)
            if (r > 150 && g > 100 && b < 100 && Math.abs(r - g) < 60) brownYellowCount++;

            // Heuristic for reddish/purple (ragi)
            if (r > 100 && b > 80 && g < r && g < b) reddishCount++;
          }

          const greenPercent = (greenCount / totalPixels) * 100;
          const skinPercent = (skinCount / totalPixels) * 100;
          const brownYellowPercent = (brownYellowCount / totalPixels) * 100;
          const reddishPercent = (reddishCount / totalPixels) * 100;

          console.log(`Analysis for ${cropType}: Green ${greenPercent.toFixed(1)}%, Brown/Yellow ${brownYellowPercent.toFixed(1)}%, Reddish ${reddishPercent.toFixed(1)}%, Skin ${skinPercent.toFixed(1)}%`);

          if (skinPercent > 10) {
            console.log('Validation failed: Detected human skin tones.');
            return resolve(false); // Likely a person
          }

          switch (cropType) {
            case 'paddy':
              // Paddy is mostly green, can be yellow when mature
              if (greenPercent > 20 || (greenPercent > 10 && brownYellowPercent > 15)) return resolve(true);
              break;
            case 'ragi':
              // Ragi has green leaves but can have reddish heads
              if (greenPercent > 15 && reddishPercent > 3) return resolve(true);
              break;
            case 'wheat':
              // Wheat is green, then turns golden yellow
              if (greenPercent > 20 || brownYellowPercent > 25) return resolve(true);
              break;
          }

          console.log(`Validation failed: Image does not match ${cropType} profile.`);
          resolve(false); // Default to rejecting if unsure
        };
        image.onerror = () => reject(new Error('Could not load image for validation.'));
      };
      reader.onerror = () => reject(new Error('Could not read file.'));
    });
  };

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageError(null);
      setIsCheckingImage(true);
      setAnalysisComplete(false);

      try {
        const isCorrectCrop = await simulateImageContentValidation(file, selectedCrop);
        setIsCheckingImage(false);

        if (!isCorrectCrop) {
          setImageError(`This does not appear to be a ${selectedCrop} plant. Please upload a correct image.`);
          if (fileInputRef.current) fileInputRef.current.value = '';
          return;
        }

        setSelectedImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setAnalysisComplete(false);
      } catch (err) {
        setIsCheckingImage(false);
        const message = err instanceof Error ? err.message : 'An unknown error occurred.';
        setImageError(`Image validation failed: ${message}`);
        console.error('Image validation error:', err);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const simulateAIAnalysis = (): Promise<{
    height: number;
    leafArea: number;
    growthStage: CropData['growthStage'];
    healthStatus: CropData['healthStatus'];
  }> => {
    return new Promise((resolve) => {
      // This timeout simulates the network request to an external AI service
      // and the time it takes for the model to process the image.
      setTimeout(() => {
        console.log('Simulating response from external AI service...');

        // In a real backend, this logic would run on the server after receiving the image.
        const daysAfterSeeding = seedingDate ? 
          Math.floor((new Date().getTime() - new Date(seedingDate).getTime()) / (1000 * 60 * 60 * 24)) : 30;

        let height = Math.max(5, Math.min(120, 10 + (daysAfterSeeding * 0.8) + (Math.random() * 10 - 5)));
        let leafArea = Math.max(20, Math.min(800, 30 + (daysAfterSeeding * 3) + (Math.random() * 50 - 25)));
        
        let growthStage: CropData['growthStage'] = 'seedling';
        if (daysAfterSeeding > 80) growthStage = 'maturity'; else if (daysAfterSeeding > 65) growthStage = 'grain-filling'; else if (daysAfterSeeding > 50) growthStage = 'flowering'; else if (daysAfterSeeding > 35) growthStage = 'panicle-initiation'; else if (daysAfterSeeding > 25) growthStage = 'stem-elongation'; else if (daysAfterSeeding > 15) growthStage = 'tillering';

        // Determine health status based on expected growth
        const expectedHeight = 15 + (daysAfterSeeding * 0.9);
        let healthStatus: CropData['healthStatus'] = 'healthy';
        
        if (height < expectedHeight * 0.7) healthStatus = 'stunted';
        else if (height < expectedHeight * 0.85) healthStatus = 'slow';

        resolve({
          height: Math.round(height),
          leafArea: Math.round(leafArea),
          growthStage,
          healthStatus
        });
      }, 3000);
    });
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !seedingDate) return;

    setIsAnalyzing(true);
    
    try {
      console.log('Simulating sending image to external AI service...');
      // In a real app, this would be a fetch() call to your backend API.
      // The backend would then call the actual AI service.
      // e.g., const analysis = await fetch('/api/analyze', { method: 'POST', body: formData });
      const analysis = await simulateAIAnalysis();
      console.log('Simulated AI service response received.');
      
      const daysAfterSeeding = Math.floor((new Date().getTime() - new Date(seedingDate).getTime()) / (1000 * 60 * 60 * 24));
      
      const newCropData: CropData = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        imageUrl: previewUrl,
        height: analysis.height,
        leafArea: analysis.leafArea,
        growthStage: analysis.growthStage,
        healthStatus: analysis.healthStatus,
        daysAfterSeeding,
        cropType: selectedCrop,
      };

      onDataAdd(newCropData);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setAnalysisComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Seeding Date Setup */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span>Crop Information</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="seedingDate" className="block text-sm font-medium text-gray-700 mb-2">
              When did you plant the seeds?
            </label>
            <input
              type="date"
              id="seedingDate"
              value={seedingDate}
              onChange={(e) => onSeedingDateChange(e.target.value)}
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              This helps us track your crop's growth stages accurately
            </p>
          </div>
          
          {seedingDate && (
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Current Status</h4>
              <p className="text-sm text-green-800">
                Days since planting: <span className="font-bold">
                  {Math.floor((new Date().getTime() - new Date(seedingDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Camera className="h-5 w-5 text-green-500" />
          <span>Upload Crop Photo</span>
        </h2>

        {!selectedImage ? (
          isCheckingImage ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900">Validating image...</h3>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Take or Upload a Photo</h3>
              <p className="text-gray-600 mb-4">
                Capture a clear image of your {selectedCrop} plants for AI analysis
              </p>
              {imageError && (
                <div className="flex items-center justify-center bg-red-100 text-red-700 p-3 rounded-md mb-4">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <p className="text-sm">{imageError}</p>
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span>Choose Photo</span>
              </button>
            </div>
          )
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Selected crop"
                className="w-full max-w-md mx-auto rounded-lg shadow-sm"
              />
              {!analysisComplete && (
                <button
                  onClick={resetUpload}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              )}
            </div>

            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Uploading and analyzing your crop...</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✔️ Sending image to AI service</p>
                  <p>🧠 Processing with computer vision model</p>
                  <p>📈 Calculating growth metrics</p>
                  <p>📋 Generating health report</p>
                </div>
              </div>
            ) : analysisComplete ? (
              <div className="text-center py-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis Complete!</h3>
                <p className="text-gray-600 mb-4">
                  Your crop data has been saved and analyzed
                </p>
                <button
                  onClick={resetUpload}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Upload Another Photo</span>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={handleAnalyze}
                  disabled={!seedingDate}
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Info className="h-4 w-4" />
                  <span>Upload & Analyze</span>
                </button>
                {!seedingDate && (
                  <p className="text-sm text-red-600 mt-2">
                    Please set your seeding date first
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Photography Tips - Now with crop-specific advice */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          📸 Photo Tips for Best {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} Results
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div className="space-y-2">
            {selectedCrop === 'paddy' && (
              <>
                <p>• Capture a close-up of the leaves and stem.</p>
                <p>• Ensure the characteristic green or golden-yellow color is clear.</p>
                <p>• Take the photo from the side, showing the plant's height.</p>
              </>
            )}
            {selectedCrop === 'ragi' && (
              <>
                <p>• Focus on the finger-like heads (spikes) of the plant.</p>
                <p>• The reddish-brown color of the grains is important.</p>
                <p>• Capture the top portion of the plant where grains are visible.</p>
              </>
            )}
            {selectedCrop === 'wheat' && (
              <>
                <p>• Take a picture of the entire stalk, including the head (spike).</p>
                <p>• The golden-brown color of mature wheat is a key feature.</p>
                <p>• Ensure the background is not too cluttered.</p>
              </>
            )}
          </div>
          <div className="space-y-2">
            <p>• Take photo during good daylight hours.</p>
            <p>• Keep camera steady and focus clear.</p>
            <p>• Avoid shadows covering the plant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;