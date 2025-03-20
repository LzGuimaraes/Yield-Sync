import React from 'react';

interface TabSelectorProps {
  activeTab: 'inputs' | 'results';
  setActiveTab: (tab: 'inputs' | 'results') => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-row gap-2 sm:gap-4 bg-gray-100 p-2 sm:p-4 w-full">
      <button 
        onClick={() => setActiveTab('inputs')}
        data-tab="inputs"
        className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
          activeTab === 'inputs' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'bg-white text-blue-700'
        }`}
      >
        Dados de Entrada
      </button>
      <button 
        onClick={() => setActiveTab('results')}
        data-tab="results"
        className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
          activeTab === 'results' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'bg-white text-blue-700'
        }`}
      >
        Indicadores
      </button>
    </div>
  );
};

export default TabSelector;