import React from 'react';
import { scrollToResults } from '../utils/scrollUtils';

interface ActionButtonsProps {
  resetForm: () => void;
  loadSampleData: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ resetForm, loadSampleData }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-4 space-y-3 md:space-x-3 md:space-y-0">
  <button 
    onClick={resetForm}
    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
  >
    <span className="mr-1">🗑️</span> Limpar
  </button>
  <button 
    onClick={loadSampleData}
    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition shadow-md flex items-center"
  >
    <span className="mr-1">📋</span> Carregar Exemplo
  </button>
  <button 
    onClick={scrollToResults}
    className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition shadow-md flex items-center"
  >
    <span className="mr-1">📊</span> Verificar
  </button>
</div>

  );
};

export default ActionButtons;