import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Clean up previous URL first
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError("");
      setPrediction(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;
      setPrediction(result);

      // Save to localStorage
      const history = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
      const newRecord = {
        id: Date.now(),
        filename: file.name,
        prediction: result.prediction,
        confidence: result.confidence,
        timestamp: new Date().toISOString(),
        imageUrl: previewUrl
      };
      localStorage.setItem("predictionHistory", JSON.stringify([newRecord, ...history].slice(0, 50)));

    } catch (err) {
      setError(err.response?.data?.message || "Error uploading file. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== FIXED RENDER SECTION =====
  return (
    <div className="flex-1 flex flex-col"> {/* Ensure it grows to fill space */}
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
            Upload Plant Image
          </h1>

          {/* File Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-green-100 file:text-green-700
                hover:file:bg-green-200"
              disabled={loading}
            />
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mb-4 flex justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-lg object-contain border border-gray-200"
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-medium text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } transition-colors`}
          >
            {loading ? "Processing..." : "Analyze Image"}
          </button>

          {/* Prediction Result */}
          {prediction && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h2 className="text-lg font-medium text-green-800 mb-2">
                Analysis Results
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Disease:</span> {prediction.prediction}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Confidence:</span>{" "}
                  {(prediction.confidence * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;