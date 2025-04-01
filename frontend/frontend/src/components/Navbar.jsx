import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          PestDetectAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600">
            About
          </Link>
          <Link to="/upload" className="text-gray-700 hover:text-green-600">
            Upload
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <Link to="/" className="block py-2 text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link to="/about" className="block py-2 text-gray-700 hover:text-green-600">
            About
          </Link>
          <Link to="/upload" className="block py-2 text-gray-700 hover:text-green-600">
            Upload
          </Link>
          <Link to="/contact" className="block py-2 text-gray-700 hover:text-green-600">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
