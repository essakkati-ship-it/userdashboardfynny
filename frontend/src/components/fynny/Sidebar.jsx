import React from 'react';
import {
  X, Star, Settings, Calculator, Target, Map,
  Bookmark, Calendar, Sparkles, Activity
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activeScreen, setActiveScreen }) => {
  return (
    <React.Fragment>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)} 
          data-testid="sidebar-overlay"
        />
      )}

      <aside 
        data-testid="sidebar"
        className={`fixed lg:sticky lg:top-0 z-50 h-screen bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64 flex-shrink-0 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-pink-500 font-bold text-xl tracking-tight">fynny</span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 hover:bg-gray-100 rounded-full"
            data-testid="close-sidebar-btn"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-5 pt-5 pb-3">
          <span className="text-pink-500 font-bold text-xl tracking-tight">fynny</span>
        </div>

        <div className="px-5 pb-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold bg-gradient-to-br from-green-500 to-teal-600">
              H
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Hay</h2>
              <p className="text-xs text-pink-500 font-medium flex items-center gap-1">
                <Sparkles size={10} /> fynny member
              </p>
            </div>
          </div>
        </div>

        <div className="px-3 flex-1">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">My stuff</h3>
          <nav className="space-y-0.5">
            <button 
              onClick={() => setActiveScreen('plan')} 
              data-testid="nav-plan"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl transition-all text-left ${activeScreen === 'plan' ? 'bg-amber-50 border border-amber-200' : 'hover:bg-gray-50'}`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <Star className="text-amber-500" size={14} />
              </div>
              <span className="flex-1 text-gray-700 font-medium text-sm">Money Habits Plan</span>
            </button>

            <button 
              onClick={() => setActiveScreen('commitments')} 
              data-testid="nav-commitments"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left ${activeScreen === 'commitments' ? 'bg-pink-50 border border-pink-200' : 'hover:bg-gray-50'}`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                <Target className="text-pink-500" size={14} />
              </div>
              <span className="text-gray-700 font-medium text-sm">My Commitments</span>
            </button>

            <button 
              onClick={() => setActiveScreen('health')} 
              data-testid="nav-learning-path"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left ${activeScreen === 'health' ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'}`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                <Map className="text-green-600" size={14} />
              </div>
              <span className="text-gray-700 font-medium text-sm">Learning Path</span>
            </button>

            <button 
              onClick={() => setActiveScreen('saved')} 
              data-testid="nav-saved"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left ${activeScreen === 'saved' ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'}`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                <Bookmark className="text-purple-500" size={14} />
              </div>
              <span className="text-gray-700 font-medium text-sm">Saved Lessons</span>
            </button>

            <button 
              onClick={() => setActiveScreen('financial-health')} 
              data-testid="nav-financial-health"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left ${activeScreen === 'financial-health' ? 'bg-teal-50 border border-teal-200' : 'hover:bg-gray-50'}`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                <Activity className="text-teal-600" size={14} />
              </div>
              <span className="text-gray-700 font-medium text-sm">Financial Health</span>
            </button>
          </nav>

          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2 mt-6">Resources</h3>
          <nav className="space-y-0.5">
            <button 
              onClick={() => setActiveScreen('payment-plan')} 
              data-testid="nav-payment-plan"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left ${activeScreen === 'payment-plan' ? 'bg-teal-50 border border-teal-200' : 'hover:bg-gray-50'}`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                <Calendar className="text-teal-600" size={14} />
              </div>
              <span className="text-gray-700 font-medium text-sm">Payment Plan</span>
            </button>

            <button 
              onClick={() => setActiveScreen('calculators')} 
              data-testid="nav-calculators"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left ${activeScreen === 'calculators' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <Calculator className="text-blue-600" size={14} />
              </div>
              <span className="text-gray-700 font-medium text-sm">Calculators</span>
            </button>
          </nav>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <button 
              onClick={() => setActiveScreen('settings')} 
              data-testid="nav-settings"
              className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-gray-50 text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                <Settings className="text-gray-500" size={14} />
              </div>
              <span className="text-gray-600 font-medium text-sm">Settings</span>
            </button>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
