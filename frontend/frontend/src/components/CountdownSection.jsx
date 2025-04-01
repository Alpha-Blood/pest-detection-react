import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set the target date (1 week from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
          Coming Soon: App Version 2.0
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Our upgraded plant health analysis system launches in:
        </p>
        
        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 mb-10">
          <div className="bg-white p-4 rounded-lg shadow-md w-20">
            <div className="text-3xl font-bold text-green-600">
              {timeLeft.days}
            </div>
            <div className="text-sm text-gray-500">Days</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-20">
            <div className="text-3xl font-bold text-green-600">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-500">Hours</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-20">
            <div className="text-3xl font-bold text-green-600">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-500">Minutes</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-20">
            <div className="text-3xl font-bold text-green-600">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-500">Seconds</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/pre-order" 
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Pre-Order Now
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;