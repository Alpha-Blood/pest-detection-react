import { Link } from "react-router-dom";
import aboutImage from "../assets/about-pic.jpeg"; // Update path as needed


const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="mt-20 text-4xl md:text-5xl font-bold mb-6">About Disease AI</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Empowering farmers and gardeners with AI-powered plant health diagnostics
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Mission Section */}
        <section className="mb-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
          We are revolutionizing agriculture with cutting-edge AI technology. Our system is designed to help farmers,
           researchers, and agronomists quickly and accurately detect plant diseases, enabling early intervention and healthier crops. <br />
          </p>
          <p className="text-gray-600 mb-6">Our AI-powered solution leverages machine learning and computer vision to analyze plant images
             and identify potential diseases. Users can simply upload an image of a plant leaf, and the AI will process
              the image, detect any diseases, and provide recommendations for treatment.</p>
              <h2>Key Features</h2>
              <p className="text-gray-600 mb-6">
✅ Fast & Accurate Detection – Our AI model is trained on a diverse dataset to recognize multiple plant diseases with high precision. <br />
✅ User-Friendly Interface – A simple and intuitive web platform allows farmers and agronomists to easily upload images and get instant results. <br />
✅ Cloud-Based & Mobile-Friendly – Access the system from anywhere, on any device, without needing complex installations. <br />
✅ Actionable Insights – Get disease identification, possible causes, and recommended treatments. <br />
✅ Lightweight & Efficient – Optimized using TensorFlow Lite for fast processing on mobile and low-power devices.
              </p>
              <p className="text-gray-600 mb-6">
                Plant diseases pose a major threat to global food security, causing significant yield losses each year.
                 Many farmers lack access to expert diagnosis, leading to misdiagnosis and improper treatment. Our AI system bridges this gap,
                  making plant health diagnostics accessible, affordable, and scalable for everyone.</p>
                  <p className="text-gray-600 mb-6">
                    We are constantly improving our model and expanding its capabilities. Future updates will include: <br />
🔹 Support for more plant species and diseases <br />
🔹 Integration with real-time monitoring sensors <br />
🔹 AI-driven personalized farming recommendations <br />

By combining technology and agriculture, we aim to empower farmers with the tools they need to protect their crops, increase yields, and promote sustainable farming practices. <br />

🚀 Join us on this journey to transform plant health diagnostics with AI!</p>
         
        </section>

        {/* How It Works */}
        <section className="mb-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6">How PlantDoc Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="font-semibold mb-2">1. Capture</h3>
              <p className="text-gray-600 text-sm">
                Take a photo of your plant's affected leaves or stems
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold mb-2">2. Analyze</h3>
              <p className="text-gray-600 text-sm">
                Our AI processes the image to detect diseases
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-semibold mb-2">3. Get Results</h3>
              <p className="text-gray-600 text-sm">
                Receive instant diagnosis and treatment recommendations
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Our Technology</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src={aboutImage} 
                alt="AI technology" 
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="font-semibold text-lg mb-3">Advanced Plant Pathology AI</h3>
              <p className="text-gray-600 mb-4">
                Our system uses deep learning models trained on thousands of plant disease images 
                to provide accurate diagnoses. The technology continuously improves as more users 
                contribute data.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>90%+ accuracy for common diseases</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Real-time analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Always learning and improving</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Ready to try PlantDoc?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are protecting their plants with our technology
          </p>
          <Link
            to="/upload"
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Upload Your First Plant Photo
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;