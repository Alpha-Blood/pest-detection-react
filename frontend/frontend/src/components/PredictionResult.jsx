const PredictionResult = ({ result }) => {
    if (!result) return null; // Hide if no result
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Prediction Result</h2>
        <p className="text-gray-600 mt-2">
          The AI detected:{" "}
          <span className="text-green-600 font-bold">{result.prediction}</span>
        </p>
        <p className="text-gray-500">Confidence: {Math.round(result.confidence * 100)}%</p>
      </div>
    );
  };
  
  export default PredictionResult;
  