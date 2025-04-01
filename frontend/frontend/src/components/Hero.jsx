import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-green-50 py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            AI-Powered <span className="text-green-600">Pest & Disease Detection</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Upload a plant image and let our AI analyze potential diseases or pests.
          </p>
          <div className="mt-6">
            <Link
              to="/upload"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              Upload Image
            </Link>
            <Link
              to="/about"
              className="ml-4 text-green-600 hover:text-green-700 font-semibold transition-all duration-300"
            >
              Learn More →
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="/hero-image.png" // Replace with your plant image
            alt="AI detecting plant diseases"
            className="w-full max-w-md mx-auto drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
