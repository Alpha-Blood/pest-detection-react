import { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Preview image
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-gray-700">Upload Plant Image</h2>
      <p className="text-gray-500 mb-4">AI will analyze for pests & diseases</p>

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-48 h-48 object-cover mx-auto rounded-md shadow-md mb-4"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-green-600 hover:file:bg-green-700 transition-all duration-300 cursor-pointer"
      />
      
      <button
        onClick={handleUpload}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
      >
        Predict
      </button>
    </div>
  );
};

export default FileUpload;
