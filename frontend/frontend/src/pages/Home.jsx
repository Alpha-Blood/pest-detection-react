import { Link } from "react-router-dom";
import plantImage from "../assets/plant_analysis.png"; // Update path as needed
import CountdownSection from "../components/CountdownSection";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar is already included from parent component */}
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section - Split Panel */}
        <section className="flex flex-col mt-10 md:flex-row bg-white">
          {/* Left Panel - Text Content */}
          <div className="w-full md:w-1/2 bg-green-50 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">
                AI Powered Plant Health Diagnosis
              </h1>
              <p className="text-gray-600 mb-6">
                Advanced disease detection with artificial intelligence technology
              </p>
              <Link 
                to="/upload" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Right Panel - Image */}
          <div className="w-full md:w-1/2 bg-green-50 p-8 flex items-center justify-center">
            <img
              src={plantImage}
              alt="Plant health analysis"
              className="w-full h-auto max-h-96 object-contain"
              loading="lazy"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 - Upload */}
              <div className="p-6 border border-gray-200 rounded-lg text-center bg-white">
                <div className="text-3xl mb-3">📸</div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">Upload</h3>
                <p className="text-gray-600 text-sm">
                  Take a photo of your plant and upload it to our system
                </p>
              </div>
              
              {/* Step 2 - Analyze */}
              <div className="p-6 border border-gray-200 rounded-lg text-center bg-white">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">Analyze</h3>
                <p className="text-gray-600 text-sm">
                  Our AI scans the image for diseases and pests
                </p>
              </div>
              
              {/* Step 3 - Results */}
              <div className="p-6 border border-gray-200 rounded-lg text-center bg-white">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">Results</h3>
                <p className="text-gray-600 text-sm">
                  Get instant diagnosis and treatment recommendations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Version Countdown Section */}
<CountdownSection />

      </main>

      {/* Footer is already included from parent component */}
    </div>
  );
};

export default Home;