
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-green-50">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-green-800 leading-tight">
            AI-Powered <br /> <span className="text-green-600">Plant Health</span> Diagnosis 🌿
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Instantly detect plant diseases and pests using AI. Upload a photo and get real-time insights.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex justify-center space-x-6">
            <Link to="/upload" className="btn">
              Get Started
            </Link>
            <a href="#how-it-works" className="btn-outline">
              Learn More
            </a>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-12">
          <img
            src="../assets/plant_analysis.png"
            alt="Plant Analysis"
            className="w-3/4 max-w-lg mx-auto rounded-xl shadow-md"
          />
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="mt-16 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-green-700">How It Works</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700">📸 Upload</h3>
              <p className="text-gray-600 mt-2">Take a photo of your plant and upload it.</p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700">🤖 Analyze</h3>
              <p className="text-gray-600 mt-2">AI scans the image for diseases and pests.</p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700">📊 Results</h3>
              <p className="text-gray-600 mt-2">Get insights and recommendations instantly.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
