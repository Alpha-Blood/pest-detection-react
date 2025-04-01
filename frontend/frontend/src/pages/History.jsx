import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const History = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        // Load from localStorage
        const storedData = localStorage.getItem("predictionHistory");
        
        if (!storedData || storedData === "[]") {
          setPredictions([]);
          setLoading(false);
          return;
        }

        const parsedData = JSON.parse(storedData);
        
        if (!Array.isArray(parsedData)) {
          console.warn("Invalid history format - resetting");
          localStorage.removeItem("predictionHistory");
          setPredictions([]);
          return;
        }

        // Enhance data with proper image URLs
        const enhancedData = parsedData.map(pred => ({
          ...pred,
          // Use previewUrl if available, otherwise create placeholder
          imageUrl: pred.imageUrl || pred.previewUrl || "/placeholder-plant.jpg"
        }));

        setPredictions(enhancedData);
      } catch (err) {
        console.error("History load error:", err);
        setError("Failed to load history. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all prediction history?")) {
      try {
        localStorage.removeItem("predictionHistory");
        setPredictions([]);
      } catch (err) {
        console.error("Failed to clear history:", err);
        setError("Failed to clear history");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-3">Loading history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto">
          <p className="font-medium">{error}</p>
          <div className="mt-4 space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200"
            >
              Try Again
            </button>
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">Prediction History</h1>
        {predictions.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
          >
            Clear All History
          </button>
        )}
      </div>

      {predictions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-600 mt-4">No predictions yet</h3>
          <p className="text-gray-500 mt-2 mb-6">
            Your analyzed plant predictions will appear here after uploads
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Upload First Image
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map((pred, index) => (
            <div
              key={pred.id || index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                {pred.imageUrl ? (
                  <img
                    src={pred.imageUrl}
                    alt={`Plant analysis: ${pred.prediction}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-plant.jpg";
                    }}
                  />
                ) : (
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-700 mb-1 capitalize">
                  {pred.prediction?.replace(/_/g, ' ') || "Unknown diagnosis"}
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    Confidence:{" "}
                    <span className="font-medium">
                      {pred.confidence ? `${(pred.confidence * 100).toFixed(2)}%` : "N/A"}
                    </span>
                  </span>
                  {pred.confidence && (
                    <div className="w-16 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, pred.confidence * 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {pred.timestamp ? new Date(pred.timestamp).toLocaleString() : "No date recorded"}
                </p>
                {pred.filename && (
                  <p className="text-xs text-gray-400 mt-2 truncate" title={pred.filename}>
                    {pred.filename}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;