import React from "react";
import { ChevronDown, Sun, Hexagon } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-[90%] mx-auto text-[#d1cfc0] px-6 py-3 flex items-center justify-between">
      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
        <Hexagon className="h-8 w-8 text-orange-500" />
        <span className="font-semibold text-lg">Vesper</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-md">
        <div className="flex items-center gap-1 hover:text-orange-500 cursor-pointer">
          Getting Started 
        </div>
        <div className="flex items-center gap-1 hover:text-orange-500 cursor-pointer">
          Our features 
        </div>
        {/* <div className="hover:text-orange-500 cursor-pointer">Mods</div> */}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="bg-[#d1cfc0] text-black px-4 py-1.5 rounded-md font-medium flex items-center gap-1 hover:bg-[#c3c1b3] transition">
          Register →
        </button>
      </div>
    </header>
  );
};

export default Header;
