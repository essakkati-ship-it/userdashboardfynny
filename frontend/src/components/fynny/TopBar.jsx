import React from 'react';
import { Menu } from 'lucide-react';

const TopBar = ({ setIsOpen }) => (
  <header 
    data-testid="top-bar"
    className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-30 px-4 py-3 flex items-center justify-between"
  >
    <button 
      onClick={() => setIsOpen(true)} 
      className="p-2 hover:bg-gray-100 rounded-xl"
      data-testid="open-sidebar-btn"
    >
      <Menu size={20} className="text-gray-700" />
    </button>
    <span className="text-xl font-bold text-pink-500 tracking-tight">fynny</span>
    <div className="w-10"></div>
  </header>
);

export default TopBar;
