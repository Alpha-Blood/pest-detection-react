import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // Added image preview
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Better error handling

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    
    // Create preview URL
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setError(null); // Reset error on new file selection
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading file. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Plant Disease Detection
            </h1>
            <p className="text-gray-600 mb-6">
              Upload an image of your plant for analysis
            </p>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mb-6 flex justify-center">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-64 rounded-lg object-contain border border-gray-200"
              />
            </div>
          )}

          {/* File Input */}
          <label className="block mb-6">
            <span className="sr-only">Choose plant image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
              disabled={loading}
            />
          </label>

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
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Analyze Image"
            )}
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
      </section>
    </>
  );
};

export default Upload;
